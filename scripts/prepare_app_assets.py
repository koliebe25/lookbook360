"""SANDEUL 룩북 앱에 사용할 로고와 제품 카드 이미지를 준비한다.

원본 파일은 수정하지 않고 public/lookbook 아래에 WebP 사본을 생성한다.
"""

from pathlib import Path
import shutil

from PIL import Image, ImageChops, ImageOps


ROOT = Path(__file__).resolve().parent.parent
BRAND_DIR = ROOT / "public" / "lookbook" / "brand"
PRODUCT_DIR = ROOT / "public" / "lookbook" / "products" / "cards"
VIDEO_DIR = ROOT / "public" / "lookbook" / "videos"
CARD_SIZE = (600, 750)


PRODUCT_CROPS = {
    "01_01.png": {
        "01_headband": (0.30, 0.01, 0.69, 0.11),
        "01_top": (0.23, 0.10, 0.66, 0.34),
        "01_pants": (0.15, 0.32, 0.73, 0.83),
        "01_bag": (0.69, 0.21, 1.00, 0.55),
        "01_boots": (0.12, 0.82, 0.79, 1.00),
    },
    "02_01.png": {
        "02_top": (0.25, 0.01, 0.70, 0.25),
        "02_pants": (0.09, 0.25, 0.79, 0.84),
        "02_sneakers": (0.18, 0.85, 0.72, 1.00),
    },
    "03_01.jpg": {
        "03_knit": (0.04, 0.02, 0.56, 0.30),
        "03_pants": (0.05, 0.31, 0.58, 0.93),
        "03_tote": (0.54, 0.06, 1.00, 0.39),
        "03_cap": (0.63, 0.52, 0.91, 0.67),
        "03_sneakers": (0.61, 0.73, 1.00, 0.94),
    },
    "04_01.png": {
        "04_hoodie": (0.05, 0.00, 0.77, 0.49),
        "04_shorts": (0.21, 0.52, 0.67, 0.79),
        "04_cap": (0.70, 0.08, 1.00, 0.32),
        "04_tote": (0.71, 0.42, 1.00, 0.76),
        "04_sneakers": (0.20, 0.82, 0.91, 0.99),
    },
    "05_01.png": {
        "05_shirt": (0.02, 0.00, 0.66, 0.41),
        "05_tank": (0.65, 0.01, 1.00, 0.40),
        "05_denim": (0.18, 0.40, 0.73, 0.88),
        "05_bag": (0.76, 0.40, 1.00, 0.60),
        "05_jewelry": (0.79, 0.62, 1.00, 0.78),
        "05_sneakers": (0.20, 0.88, 0.76, 1.00),
    },
    "06_01.png": {
        "06_cardigan": (0.36, 0.03, 0.88, 0.39),
        "06_tank": (0.04, 0.20, 0.40, 0.57),
        "06_pants": (0.40, 0.42, 0.88, 0.94),
        "06_belt": (0.42, 0.38, 0.84, 0.48),
        "06_cap": (0.06, 0.05, 0.30, 0.22),
        "06_sneakers": (0.02, 0.57, 0.43, 0.88),
    },
    "07_01.png": {
        "07_vest": (0.18, 0.03, 0.59, 0.39),
        "07_tee": (0.61, 0.05, 1.00, 0.42),
        "07_pants": (0.17, 0.40, 0.67, 0.84),
        "07_beanie": (0.02, 0.14, 0.21, 0.37),
        "07_boots": (0.16, 0.84, 0.72, 1.00),
    },
}


LOOK_BACKGROUNDS = {
    "01": "#eee8df",
    "02": "#f3f0eb",
    "03": "#ffffff",
    "04": "#f7f0e7",
    "05": "#f8ebe2",
    "06": "#d1cfca",
    "07": "#deddda",
}


def ensure_new(target: Path) -> None:
    if target.exists():
        raise FileExistsError(f"기존 파일을 덮어쓰지 않습니다: {target}")


def crop_box(image: Image.Image, normalized: tuple[float, float, float, float]) -> tuple[int, int, int, int]:
    left, top, right, bottom = normalized
    return (
        round(left * image.width),
        round(top * image.height),
        round(right * image.width),
        round(bottom * image.height),
    )


def prepare_product_images() -> None:
    PRODUCT_DIR.mkdir(parents=True, exist_ok=True)
    for source_name, crops in PRODUCT_CROPS.items():
        source_path = ROOT / source_name
        with Image.open(source_path) as opened:
            source = ImageOps.exif_transpose(opened).convert("RGB")
            for product_id, normalized_box in crops.items():
                target = PRODUCT_DIR / f"{product_id}.webp"
                ensure_new(target)
                cropped = source.crop(crop_box(source, normalized_box))
                card = ImageOps.pad(
                    cropped,
                    CARD_SIZE,
                    method=Image.Resampling.LANCZOS,
                    color=LOOK_BACKGROUNDS[product_id[:2]],
                    centering=(0.5, 0.5),
                )
                card.save(target, "WEBP", quality=84, method=6)
                print(f"제품 이미지: {target.relative_to(ROOT)}")


def transparent_logo(source_path: Path, target: Path) -> None:
    ensure_new(target)
    with Image.open(source_path) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGBA")
        red, green, blue, _ = image.split()
        darkest = ImageChops.darker(ImageChops.darker(red, green), blue)
        alpha = darkest.point(lambda value: max(0, min(255, (255 - value) * 8)))
        image.putalpha(alpha)
        bbox = image.getchannel("A").getbbox()
        if bbox is None:
            raise ValueError(f"로고 영역을 찾을 수 없습니다: {source_path}")
        left, top, right, bottom = bbox
        pad_x = max(8, round((right - left) * 0.03))
        pad_y = max(8, round((bottom - top) * 0.06))
        cropped = image.crop(
            (
                max(0, left - pad_x),
                max(0, top - pad_y),
                min(image.width, right + pad_x),
                min(image.height, bottom + pad_y),
            )
        )
        cropped.thumbnail((900, 320), Image.Resampling.LANCZOS)
        cropped.save(target, "WEBP", lossless=True, method=6)
        print(f"로고: {target.relative_to(ROOT)}")


def copy_videos() -> None:
    VIDEO_DIR.mkdir(parents=True, exist_ok=True)
    for index in range(1, 8):
        source = ROOT / f"{index:02d}_02.mp4"
        target = VIDEO_DIR / source.name
        if not target.exists():
            shutil.copy2(source, target)
            print(f"영상 사본: {target.relative_to(ROOT)}")


def main() -> None:
    BRAND_DIR.mkdir(parents=True, exist_ok=True)
    black_logo = BRAND_DIR / "sandeul-logo-black.webp"
    green_logo = BRAND_DIR / "sandeul-logo-green.webp"
    if not black_logo.exists():
        transparent_logo(ROOT / "sandeul_logo_b.jpg", black_logo)
    if not green_logo.exists():
        transparent_logo(ROOT / "sandeul_logo_g.jpeg", green_logo)
    prepare_product_images()
    copy_videos()


if __name__ == "__main__":
    main()
