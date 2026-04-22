from pathlib import Path
import re

fonts_block = '''    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;600;700&display=swap">
'''

patterns = [
    (re.compile(r'\s*<link rel="preconnect" href="https://cdnjs\.cloudflare\.com" crossorigin>\s*<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/font-awesome/6\.4\.0/css/all\.min\.css">', re.MULTILINE), ''),
    (re.compile(r'<link rel="preload" href="style\.css" as="style" onload="this\.rel=\'stylesheet\'">'), '<link rel="stylesheet" href="style.css">'),
    (re.compile(r'<noscript><link rel="stylesheet" href="style.css"></noscript>'), ''),
    (re.compile(r'&auto=format&fit=crop&w=(\d+)&q=(\d+)(?!&fm=webp)'), r'&auto=format&fit=crop&w=\1&q=60&fm=webp')
]

replacements = {
    'class="fa fa-times"': 'class="icon icon-times"',
    'class="fa fa-bars"': 'class="icon icon-bars"',
    'class="fa fa-star-half-o"': 'class="icon icon-star icon-star-half"',
    'class="fa fa-star-o"': 'class="icon icon-star icon-star-empty"',
    'class="fa fa-star"': 'class="icon icon-star icon-star-full"',
    'class="fa fa-heart"': 'class="icon icon-heart"',
    'class="fab fa-facebook-f"': 'class="social-icon social-facebook"',
    'class="fab fa-twitter"': 'class="social-icon social-twitter"',
    'class="fab fa-instagram"': 'class="social-icon social-instagram"',
    'class="fab fa-linkedin-in"': 'class="social-icon social-linkedin"',
    'class="fa fa-calendar"': 'class="icon icon-calendar"',
    'class="fa fa-info-circle"': 'class="icon icon-info"',
    'class="fa fa-home"': 'class="icon icon-home"',
    'class="fa fa-phone"': 'class="icon icon-phone"',
    'class="fa fa-envelope-o"': 'class="icon icon-envelope"'
}

for path in Path('.').glob('*.html'):
    text = path.read_text(encoding='utf-8')
    for pattern, repl in patterns:
        text = pattern.sub(repl, text)
    if 'fonts.googleapis.com/css2?family=Poppins' not in text:
        text = re.sub(r'(<meta name="viewport" content="width=device-width, initial-scale=1\.0">\s*)', r'\1' + fonts_block, text, count=1)
    for old, new in replacements.items():
        text = text.replace(old, new)
    path.write_text(text, encoding='utf-8')
