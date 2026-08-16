"""룩북 원본 이미지를 모바일 친화적인 WebP 썸네일로 변환한다."""

from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = ROOT / "public" / "lookbook" / "thumbnails"
SOURCE_FILES = [
    ROOT / "01_01.png",
    ROOT / "02_01.png",
    ROOT / "03_01.jpg",
    ROOT / "04_01.png",
    ROOT / "05_01.png",
    ROOT / "06_01.png",
    ROOT / "07_01.png",
]
TARGET_WIDTH = 720
WEBP_QUALITY = 82


def convert_thumbnail(source: Path) -> Path:
    target = OUTPUT_DIR / f"{source.stem}.webp"
    if target.exists():
        raise FileExistsError(f"기존 파일을 덮어쓰지 않습니다: {target}")

    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        if image.width > TARGET_WIDTH:
            height = round(image.height * TARGET_WIDTH / image.width)
            image = image.resize((TARGET_WIDTH, height), Image.Resampling.LANCZOS)
        image.save(target, "WEBP", quality=WEBP_QUALITY, method=6)

    return target


def main() -> None:
    missing = [source for source in SOURCE_FILES if not source.exists()]
    if missing:
        names = ", ".join(path.name for path in missing)
        raise FileNotFoundError(f"원본 파일을 찾을 수 없습니다: {names}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for source in SOURCE_FILES:
        target = convert_thumbnail(source)
        print(f"{source.name} -> {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
