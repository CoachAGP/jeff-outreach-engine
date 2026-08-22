from pathlib import Path

from PIL import Image, ImageDraw


files = sorted(Path("artifacts/rendered-brief").glob("page-*.png"))
thumbs = []
thumb_width = 300
for index, path in enumerate(files, start=1):
    image = Image.open(path).convert("RGB")
    height = int(image.height * thumb_width / image.width)
    thumbnail = image.resize((thumb_width, height))
    canvas = Image.new("RGB", (thumb_width, height + 28), "white")
    canvas.paste(thumbnail, (0, 28))
    ImageDraw.Draw(canvas).text((8, 6), f"Page {index}", fill="black")
    thumbs.append(canvas)

columns = 3
rows = (len(thumbs) + columns - 1) // columns
max_height = max(image.height for image in thumbs)
sheet = Image.new("RGB", (columns * thumb_width, rows * max_height), (220, 220, 220))
for index, image in enumerate(thumbs):
    sheet.paste(image, ((index % columns) * thumb_width, (index // columns) * max_height))
sheet.save("artifacts/rendered-brief/contact-sheet.png")
