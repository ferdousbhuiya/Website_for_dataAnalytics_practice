import zipfile
import xml.etree.ElementTree as ET
import sys
import os

docx_path = 'CompleteBook.docx'

if not os.path.exists(docx_path):
    print(f"Error: {docx_path} not found.")
    sys.exit(1)

try:
    with zipfile.ZipFile(docx_path) as docx:
        xml_content = docx.read('word/document.xml')
        
    tree = ET.fromstring(xml_content)
    
    # Namespaces usually used in docx
    # We mainly need valid paragraphs
    # The default namespace often contains the 'w' prefix
    
    namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    
    text_content = []
    
    # Iterate through paragraphs
    for p in tree.iterfind('.//w:p', namespaces):
        texts = [node.text for node in p.iterfind('.//w:t', namespaces) if node.text]
        if texts:
            text_content.append(''.join(texts))
            
    with open('book_content_utf8.txt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(text_content))
            
    print("Extraction complete. Check book_content_utf8.txt")

except Exception as e:
    print(f"Error reading docx: {e}")
