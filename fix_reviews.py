import re

file_path = r'c:\Users\brada\Desktop\elevate-exterior\index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_str = '            <div class="scrolling-reviews-track">'
end_str = '            </div>\n        </div>\n    </section>'

start = content.find(start_str)
end = content.find(end_str)

if start != -1 and end != -1:
    track_content = content[start + len(start_str):end]
    
    # Extract the cards by splitting on the class name
    cards = track_content.split('                <div class="scrolling-review-card">')
    
    # We want exactly the first 4 cards
    first_4 = []
    for i in range(1, 5):
        first_4.append('                <div class="scrolling-review-card">' + cards[i])
        
    group_html = "".join(first_4)
    
    # create 6 wrapper groups
    new_track_html = "\n"
    for i in range(6):
        aria = ' aria-hidden="true"' if i > 0 else ''
        new_track_html += f'                <div class="reviews-group"{aria}>\n'
        new_track_html += group_html
        new_track_html += '                </div>\n'
        
    new_content = content[:start + len(start_str)] + new_track_html + content[end:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced HTML")
else:
    print("Could not find boundaries")
