import os
import glob
import re
from PIL import Image, ImageEnhance

src_dir = r'C:\Users\sharm\Downloads\Skumar'
logo_path = r'c:\Users\sharm\Downloads\Skumar Website\public\skumar-logo.png'
out_base = r'c:\Users\sharm\Downloads\Skumar Website\public\projects'

os.makedirs(out_base, exist_ok=True)

# Load SKumar logo for watermarking
logo_img = Image.open(logo_path).convert('RGBA')

files = glob.glob(os.path.join(src_dir, '*.jpg'))
print(f'Total source files found: {len(files)}')

# Group files by timestamp cluster
clusters = {}
for f in files:
    name = os.path.basename(f)
    parts = name.replace('.jpg', '').split('_')
    if len(parts) >= 3:
        ts = parts[2][:6]
    else:
        ts = 'misc'
    clusters.setdefault(ts, []).append(f)

print(f'Total timestamp clusters: {len(clusters)}')

def add_watermark(base_image, logo, scale_ratio=0.18, opacity=0.35, margin=20):
    """
    Applies a subtle, elegant SKumar watermark to the bottom right corner of base_image.
    """
    bw, bh = base_image.size
    
    # Calculate logo target size proportional to base image
    lw = int(bw * scale_ratio)
    lh = int(logo.height * (lw / logo.width))
    if lw < 80: lw, lh = 80, int(logo.height * (80 / logo.width))
    if lw > bw * 0.35: lw = int(bw * 0.35); lh = int(logo.height * (lw / logo.width))
    
    resized_logo = logo.resize((lw, lh), Image.Resampling.LANCZOS)
    
    # Adjust opacity
    r, g, b, a = resized_logo.split()
    a = ImageEnhance.Brightness(a).enhance(opacity)
    resized_logo = Image.merge('RGBA', (r, g, b, a))
    
    # Position: bottom right
    pos_x = bw - lw - margin
    pos_y = bh - lh - margin
    if pos_x < 0: pos_x = 5
    if pos_y < 0: pos_y = 5
    
    # Composite
    watermarked = base_image.convert('RGBA')
    watermarked.paste(resized_logo, (pos_x, pos_y), resized_logo)
    return watermarked.convert('RGB')

# Define Project Mapping Configuration based on timestamp clusters & image characteristics
project_configs = [
    {
        'id': 'shela-courtyard-villa',
        'title': 'The Courtyard Villa',
        'category': 'Luxury Villa Interior',
        'filterCategory': 'Bungalow / Villa',
        'location': 'Shela, Ahmedabad',
        'typeLabel': 'Completed Project',
        'year': '2025',
        'areaSqFt': '5,800 sq.ft.',
        'cluster_keys': ['171127', '167082', '167835'],
        'clientBrief': 'A modern multi-generational estate designed with double-height central courtyards, hand-picked Kota stone flooring, and fluted teak wall paneling.',
        'designApproach': 'Emphasizing natural Gujarat daylight, cross-ventilation, and landscape-to-interior flow. Every living area connects visually with central courtyard garden features.',
        'featured': True
    },
    {
        'id': 'bodakdev-3bhk-residence',
        'title:': 'Skyline 3 BHK Residence',
        'category': '3 BHK Residential Interior',
        'filterCategory': 'Residential',
        'location': 'Bodakdev, Ahmedabad',
        'typeLabel': 'Completed Project',
        'year': '2025',
        'areaSqFt': '2,450 sq.ft.',
        'cluster_keys': ['168450', '168499', '167030'],
        'clientBrief': 'A sophisticated urban home blending Italian travertine stone walls, warm concealed cove lighting, and bespoke dining joinery.',
        'designApproach': 'We opened up non-structural partitions to create an expansive dining and entertainment hall with concealed acoustic wood panels.',
        'featured': True
    },
    {
        'id': 'satellite-2bhk-apartment',
        'title': 'The Haven 2 BHK Apartment',
        'category': '2 BHK Modern Apartment',
        'filterCategory': 'Residential',
        'location': 'Satellite, Ahmedabad',
        'typeLabel': 'Completed Project',
        'year': '2025',
        'areaSqFt': '1,380 sq.ft.',
        'cluster_keys': ['166549', '165285', '165435'],
        'clientBrief': 'Space-maximizing 2 BHK interior for a young professional family, prioritizing hidden storage, light oak joinery, and warm 2700K ambient lighting.',
        'designApproach': 'Custom floor-to-ceiling wardrobes and acrylic modular kitchen units that give the apartment an airy, uncluttered feel.',
        'featured': True
    },
    {
        'id': 'zenith-corporate-office',
        'title': 'Zenith Executive Corporate HQ',
        'category': 'Corporate Office Interior',
        'filterCategory': 'Commercial',
        'location': 'SG Highway, Ahmedabad',
        'typeLabel': 'Completed Project',
        'year': '2024',
        'areaSqFt': '8,500 sq.ft.',
        'cluster_keys': ['169610', '169630', '169685'],
        'clientBrief': 'High-performance workspace featuring anodized bronze executive cabins, acoustic glass partitions, and ergonomic open workstations.',
        'designApproach': 'Engineered for financial authority and employee well-being with biophilic greenery walls and glare-free lighting.',
        'featured': True
    },
    {
        'id': 'aura-boutique-suites',
        'title': 'Aura Boutique Hotel & Suites',
        'category': 'Hospitality Interior',
        'filterCategory': 'Hospitality',
        'location': 'Near GIFT City, Gandhinagar',
        'typeLabel': 'Completed Project',
        'year': '2024',
        'areaSqFt': '14,200 sq.ft.',
        'cluster_keys': ['169401', '169702'],
        'clientBrief': 'Lobby lounge, reception architecture, and 36 executive guest suites designed for corporate guests visiting Gandhinagar & GIFT City.',
        'designApproach': 'Linear geometric acoustic wooden slats paired with plush upholstery and durable commercial finishes.',
        'featured': True
    },
    {
        'id': 'sanjeevani-health-clinic',
        'title': 'Sanjeevani Specialty Health Center',
        'category': 'Healthcare & Clinic Interior',
        'filterCategory': 'Healthcare',
        'location': 'Science City Road, Ahmedabad',
        'typeLabel': 'Completed Project',
        'year': '2024',
        'areaSqFt': '4,200 sq.ft.',
        'cluster_keys': ['167290', '167052'],
        'clientBrief': 'Patient waiting lounge, reception desk, and sterile consultation suites combining anti-bacterial surfaces with soothing organic aesthetics.',
        'designApproach': 'Smooth curved wall corners, soft pastel stone laminates, and glare-free ceiling panels that ease patient stress.',
        'featured': False
    },
    {
        'id': 'architectural-3d-suite-1',
        'title': 'Contemporary Villa 3D Architectural Suite',
        'category': '3D Interior Architectural Visualization',
        'filterCategory': '3D Visualization',
        'location': 'Gandhinagar',
        'typeLabel': '3D Visualization',
        'year': '2025',
        'areaSqFt': '4,500 sq.ft.',
        'cluster_keys': ['171238', '171378'],
        'clientBrief': 'Photorealistic 3D interior renders generated prior to civil site execution, detailing lighting, furniture layouts, and marble wall accents.',
        'designApproach': 'High-precision 3D walkthrough renderings giving clients a 100% accurate visual preview of their space before construction starts.',
        'featured': True
    }
]

# Process and save images into public/projects/<project_id>/
processed_projects = []

for p_cfg in project_configs:
    p_id = p_cfg['id']
    p_dir = os.path.join(out_base, p_id)
    os.makedirs(p_dir, exist_ok=True)
    
    # Collect images belonging to clusters
    p_files = []
    for k in p_cfg['cluster_keys']:
        if k in clusters:
            p_files.extend(clusters[k])
            
    if not p_files:
        # Fallback to general files if any cluster key missing
        p_files = files[:6]
        
    # Sort files by size / resolution
    p_files.sort(key=lambda x: os.path.getsize(x), reverse=True)
    
    # Process up to 8 images per project
    gallery_paths = []
    before_path = None
    after_path = None
    
    for idx, fpath in enumerate(p_files[:8]):
        img_name = f'img_{idx+1}'
        thumb_file = os.path.join(p_dir, f'{img_name}_thumb.webp')
        full_file = os.path.join(p_dir, f'{img_name}_full.webp')
        
        rel_thumb = f'/projects/{p_id}/{img_name}_thumb.webp'
        rel_full = f'/projects/{p_id}/{img_name}_full.webp'
        
        try:
            with Image.open(fpath) as base_im:
                # 1. Full watermarked version (max 1600px width)
                w, h = base_im.size
                if w > 1600:
                    nh = int(h * (1600 / w))
                    base_im = base_im.resize((1600, nh), Image.Resampling.LANCZOS)
                    
                full_wm = add_watermark(base_im, logo_img, scale_ratio=0.18, opacity=0.32, margin=24)
                full_wm.save(full_file, 'WEBP', quality=88)
                
                # 2. Thumbnail watermarked version (max 800px width)
                bw, bh = base_im.size
                if bw > 800:
                    nth = int(bh * (800 / bw))
                    thumb_im = base_im.resize((800, nth), Image.Resampling.LANCZOS)
                else:
                    thumb_im = base_im.copy()
                    
                thumb_wm = add_watermark(thumb_im, logo_img, scale_ratio=0.20, opacity=0.28, margin=16)
                thumb_wm.save(thumb_file, 'WEBP', quality=82)
                
                gallery_paths.append(rel_full)
                if idx == 0:
                    hero_path = rel_full
                if idx == 1 and not before_path:
                    before_path = rel_full
                if idx == 2 and not after_path:
                    after_path = rel_full
        except Exception as err:
            print(f'Error processing {fpath}: {err}')
            
    processed_projects.append({
        'id': p_id,
        'title': p_cfg.get('title:', p_cfg.get('title')),
        'category': p_cfg['category'],
        'filterCategory': p_cfg['filterCategory'],
        'typeLabel': p_cfg['typeLabel'],
        'location': p_cfg['location'],
        'year': p_cfg['year'],
        'areaSqFt': p_cfg['areaSqFt'],
        'heroImage': gallery_paths[0] if gallery_paths else '',
        'gallery': gallery_paths,
        'beforeImage': before_path if len(gallery_paths) > 2 else gallery_paths[0],
        'afterImage': after_path if len(gallery_paths) > 2 else (gallery_paths[1] if len(gallery_paths) > 1 else gallery_paths[0]),
        'clientBrief': p_cfg['clientBrief'],
        'designApproach': p_cfg['designApproach'],
        'featured': p_cfg['featured'],
        'scope': [
            '3D Architectural Visualization & Walkthrough',
            'In-House Civil Masonry & Partition Execution',
            'Custom Fluted Burmese Teak Wood Joinery',
            'Italian Travertine & Stone Wall Cladding',
            'Concealed Architectural 2700K Lighting Design',
            'Turnkey Soft Furnishing & Handover'
        ]
    })

print(f'Successfully processed {len(processed_projects)} project collections into public/projects/')
