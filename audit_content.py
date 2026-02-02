import re

file_path = 'data.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

topics = {
    'sql': {'advertised_lessons': 12, 'advertised_questions': 45},
    'statistics': {'advertised_lessons': 10, 'advertised_questions': 35},
    'python': {'advertised_lessons': 14, 'advertised_questions': 40},
    'visualization': {'advertised_lessons': 8, 'advertised_questions': 25},
    'excel': {'advertised_lessons': 9, 'advertised_questions': 30},
    'business': {'advertised_lessons': 11, 'advertised_questions': 35}
}

print(f"{'Topic':<20} | {'Lessons (Act/Adv)':<20} | {'Questions (Act/Adv)':<20}")
print("-" * 65)

for topic in topics:
    # Find topic section
    # Matches 'topic: {' until the next 'topic: {' or end of file
    pattern = re.compile(rf"{topic}:\s*\{{", re.IGNORECASE)
    match = pattern.search(content)
    
    if match:
        start_index = match.end()
        # Finding the end of the object requires balancing braces or finding the next topic key
        # A simple approximation: find next key or just search within a range if assuming order
        # Assuming order: sql -> statistics -> python -> visualization -> excel -> business
        
        # Actually, let's just use specific regex for arrays within each topic
        # We can extract the 'lessons: [...]' and 'questions: [...]' blocks
        
        # Extract the whole block for the topic
        # This is hard without balancing braces. 
        # Let's count "number:" occurrences between this topic start and the next topic start
        
        # Find next topic start
        next_topic_index = len(content)
        keys = list(topics.keys())
        try:
            current_key_index = keys.index(topic)
            if current_key_index + 1 < len(keys):
                next_key = keys[current_key_index + 1]
                next_match = re.search(rf"{next_key}:\s*\{{", content, re.IGNORECASE)
                if next_match:
                    next_topic_index = next_match.start()
        except:
            pass
            
        topic_content = content[start_index:next_topic_index]
        
        # Split into lessons and questions parts
        # usually lessons come first
        q_start = topic_content.find("questions: [")
        
        lessons_block = topic_content[:q_start] if q_start != -1 else topic_content
        questions_block = topic_content[q_start:] if q_start != -1 else ""
        
        lesson_count = len(re.findall(r"number:\s*\d+", lessons_block))
        question_count = len(re.findall(r"number:\s*\d+", questions_block))
        
        adv_l = topics[topic]['advertised_lessons']
        adv_q = topics[topic]['advertised_questions']
        
        print(f"{topic:<20} | {lesson_count}/{adv_l:<17} | {question_count}/{adv_q:<17}")
