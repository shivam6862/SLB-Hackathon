from utils import llm
from collections import OrderedDict
import asyncio

async def count_leading_newlines(string:str):
  return len(string) - len(string.lstrip('\n'))
#_______________________________________________________________________________________________________________________
def find_language(text:str)->str:
    template = '''
        You are provided with a text below. 
        TEXT : {text}

        You need to check whether the above text is in Hindi...
        If so, return 1, else return 0
    '''
    response = llm.generate_response(template.format(text = text))
    print('Inside find_language' , response)
    ans = [lang for lang in ['English', 'French', 'Hindi', 'Tamil'] if lang in response]
    print('find_lang ans : ' , ans)
    return ans[0]
#_______________________________________________________________________________________________________________________
async def find_heading_indices(text:str):
    print('Inside find_heading_indices')
    curr_idx = await count_leading_newlines(text)
    headings_with_indices = OrderedDict()
    lines = text.split('\n')
    start = 0
    max_len , useful_line = 0, ''
    for line in lines:
        # print(line)
        words = line.split()
        done_processing = False
        try:
            if len(line[:line.index(':')].strip().split())<=3:
                start = curr_idx
                heading = line[:line.index(':')+1].strip()
                curr_idx += len(line) 
                headings_with_indices[heading] = (start, start+ len(heading)) 
                done_processing = True    
        except:
            pass

        if not done_processing and len(words) <= 3:
            start = curr_idx
            curr_idx += len(line) 
            headings_with_indices[line] = (start, curr_idx)    
        else :
            curr_idx += len(line)

        # selecting a line to find language of text
        if len(line) > max_len:
            max_len = len(line)
            useful_line = line

    # lang = find_language(useful_line)
    lang = 'English'
    sorted_items = sorted(headings_with_indices.items(), key=lambda x: x[0])   # sorting based on start index of headings
    print('sorted_items : ' ,sorted_items)
    return sorted_items, lang

#_______________________________________________________________________________________________________________________
async def is_heading(word , lang)->str:
    imp_words = {"1" : "Warning Statement",
        "2" : "Overview" ,
        "3" : "Advice", 
        "4" : "Emergency Contact Numbers" ,
        "5" : "Assistance",
        }
    template = '''

        Below is a dictionary of words in English with keys as index and values as words.
        {imp_words}

        - return the index of word in English language which is closest in meaning to the words "{word}" in {lang} language. 
        - If no word in English relates to the word "{word}" in {lang} language, return -1.
'''
    prompt = template.format(imp_words = imp_words, word = word, lang = lang)
    response = await llm.generate_response(prompt)
    print('Inside map_headings_to_english' , response)

    if "-1" in response:
        return None
    
    ans =  [imp_words(key) for key in imp_words.keys() if key in response]
    print('ans : ' , ans)
    return ans[0]

#_______________________________________________________________________________________________________________________

    
async def create_chunks(headings_with_indices:OrderedDict, text, lang):
    chunks = {}
    li = list(headings_with_indices.items())
    idx = -1
    for i in range(len(li)):
        possible_heading = li[i][0]
        x = asyncio.run(is_heading(possible_heading, lang))
        if x is not None:
            
            if idx!=-1:
                body_start = li[idx][1][1]+1
                body_end = li[i][1][0]-1
                body = text[body_start:body_end+1]
                chunks[x] = body
            else : 
                idx = i

    chunks[x] = text[li[idx][1][1]+1 :]
    return chunks

    