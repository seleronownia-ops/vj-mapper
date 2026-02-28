#!/usr/bin/env python3
"""
Export YOLO26n-seg to ONNX format for use in VJ Mapper.

Usage:
    pip install ultralytics
    python scripts/export-model.py

Output:
    public/models/yolo26n-seg.onnx
"""
import os
from pathlib import Path

def main():
    try:
        from ultralytics import YOLO
    except ImportError:
        print("❌ ultralytics not installed. Run: pip install ultralytics")
        return

    output_dir = Path(__file__).parent.parent / "public" / "models"
    output_dir.mkdir(parents=True, exist_ok=True)

    print("📥 Loading YOLO26n-seg model...")
    model = YOLO("yolo26n-seg.pt")

    print("📦 Exporting to ONNX...")
    model.export(
        format="onnx",
        imgsz=640,
        simplify=True,
        opset=17,  # Good compatibility with ONNX Runtime Web
        dynamic=False,  # Fixed size for WebGL inference
    )

    # Move to public/models
    src = Path("yolo26n-seg.onnx")
    dst = output_dir / "yolo26n-seg.onnx"

    if src.exists():
        import shutil
        shutil.move(str(src), str(dst))
        size_mb = dst.stat().st_size / (1024 * 1024)
        print(f"✅ Exported to {dst} ({size_mb:.1f} MB)")
    else:
        # Ultralytics might save it next to the .pt file
        alt = Path("yolo26n-seg.onnx")
        for p in [alt, Path("runs") / "segment" / "yolo26n-seg.onnx"]:
            if p.exists():
                import shutil
                shutil.move(str(p), str(dst))
                print(f"✅ Exported to {dst}")
                return
        print("⚠️  ONNX file not found. Check ultralytics output directory.")

    print("\n🚀 Place the .onnx file in public/models/ and run: npm run dev")

if __name__ == "__main__":
    main()
