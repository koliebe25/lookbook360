"""그린 SANDEUL 원본에서 흰 여백을 제거한 헤더용 투명 WebP를 만든다."""

from pathlib import Path

import numpy as np
from PIL import Image, ImageChops


ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "sandeul_logo_g.jpeg"
TARGET = ROOT / "public" / "lookbook" / "brand" / "sandeul-logo-green-header-final.webp"


def main() -> None:
    if TARGET.exists():
        raise FileExistsError(f"기존 파일을 덮어쓰지 않습니다: {TARGET}")

    with Image.open(SOURCE) as opened:
        image = opened.convert("RGB")
        red, green, blue = image.split()
        darkest = ImageChops.darker(ImageChops.darker(red, green), blue)

        content_mask = darkest.point(lambda value: 255 if value < 245 else 0)
        bbox = content_mask.getbbox()
        if bbox is None:
            raise ValueError("로고 도형 영역을 찾을 수 없습니다.")

        left, top, right, bottom = bbox
        pad_x = round((right - left) * 0.025)
        pad_y = round((bottom - top) * 0.05)
        crop_box = (
            max(0, left - pad_x),
            max(0, top - pad_y),
            min(image.width, right + pad_x),
            min(image.height, bottom + pad_y),
        )

        pixels = np.asarray(image, dtype=np.int16)
        red_values = pixels[:, :, 0]
        green_values = pixels[:, :, 1]
        blue_values = pixels[:, :, 2]
        green_signal = green_values - np.maximum(red_values, blue_values)
        darkest_values = np.minimum(np.minimum(red_values, green_values), blue_values)
        lightest_values = np.maximum(np.maximum(red_values, green_values), blue_values)
        color_spread = lightest_values - darkest_values
        valid_green = (
            (green_signal >= 4)
            & (darkest_values < 225)
            & (color_spread < 80)
        )
        alpha_values = np.where(
            valid_green,
            np.clip((green_signal - 3) * 48, 64, 255),
            0,
        ).astype(np.uint8)
        alpha = Image.fromarray(alpha_values)
        rgba = image.convert("RGBA")
        rgba.putalpha(alpha)
        cropped = rgba.crop(crop_box)
        cropped.thumbnail((1000, 500), Image.Resampling.LANCZOS)

        TARGET.parent.mkdir(parents=True, exist_ok=True)
        cropped.save(TARGET, "WEBP", lossless=True, method=6)
        print(f"{SOURCE.name} -> {TARGET.relative_to(ROOT)} {cropped.size}")


if __name__ == "__main__":
    main()
