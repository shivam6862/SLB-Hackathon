from utils import generate_response
from collections import OrderedDict

def count_leading_newlines(string:str):
  return len(string) - len(string.lstrip('\n'))
#_______________________________________________________________________________________________________________________
def find_language(text:str)->str:
    template = '''
        You are provided with a text below. 
        TEXT : {text}

        You need to check whether the above text is in Hindi...
        If so, return 1, else return 0
    '''
    response = generate_response(template.format(text = text))
    print('Inside find_language' , response)
    ans = [lang for lang in ['English', 'French', 'Hindi', 'Tamil'] if lang in response]
    print('find_lang ans : ' , ans)
    return ans[0]
#_______________________________________________________________________________________________________________________
def find_heading_indices(text:str):
    print('Inside find_heading_indices')
    curr_idx = 0
    headings_with_indices = OrderedDict()
    lines = text.split('\n')

    start = 0
    max_len , useful_line = 0, ''
    for line in lines:
        # print(line)
        words = line.strip().split()
        done_processing = False
        # print('words : ' , words)
        try:
            if len(line[:line.index(':')].strip().split())<=3:
                start = curr_idx
                heading = line[:line.index(':')+1]
                curr_idx += len(line) 
                headings_with_indices[heading] = (start, start+ len(heading)) 
                assert heading == text[start:start+len(heading)] , 'Error in heading extraction 000'
                done_processing = True    
        except:
            pass

        if not done_processing and len(words) <= 3:
            start = curr_idx
            curr_idx += len(line) 
            headings_with_indices[line] = (start, curr_idx)  
            assert line == text[start:curr_idx] , 'Error in heading extraction 111'  
            done_processing = True

        elif not done_processing:
            curr_idx += len(line)
        curr_idx += 1

        # selecting a line to find language of text
        if len(line) > max_len:
            max_len = len(line)
            useful_line = line

    # lang = find_language(useful_line)
    lang = 'English'
    sorted_items = sorted(headings_with_indices.items(), key=lambda x: x[1])   # sorting based on start index of headings
    print('sorted_items : ' ,sorted_items)
    return sorted_items, lang

#_______________________________________________________________________________________________________________________
def is_heading(word :str, lang)->str:
    imp_words = {"1" : "Warning Statement",
        "2" : "Overview" ,
        "3" : "Advice", 
        "4" : "Emergency Contact Numbers" ,
        "5" : "Assistance",
        }
    for key in imp_words.keys():
        if imp_words[key].lower().strip() in word.lower().strip():
            return imp_words[key]
        
#     template1= '''

#         You will be provided with a text written in {lang} language. 
#         {lang} : {text}

#         You need to translate this text to English.
#         English : 
        
# '''
#     template2 = '''

#     You are provided with a text : {text}

#     You are also provided with a set of other texts with their indices.
#     {imp_words}

#     If the provided text is not similar to 


# '''

#     prompt = template1.format(imp_words = imp_words, word = word, lang = lang)
#     response =  llm.generate_response(prompt)


#     print('Inside is_heading' , response)

#     if "-1" in response:
#         return None
    
#     ans =  [imp_words(key) for key in imp_words.keys() if key in response]
#     print('is_heading   ans : ' , ans)
#     return ans[0]
    

#_______________________________________________________________________________________________________________________

    
def create_chunks(headings_with_indices:OrderedDict, text, lang):
    chunks = {}
    li = headings_with_indices
    print('\n\n\nInside create_chunks' , li)
    idx = -1
    for i in range(len(li)):
        possible_heading = li[i][0]

        x = is_heading(possible_heading, lang)
        if x is not None:
            # print('x : ' , x, end = '  ')
            
            if idx!=-1:
                body_start = li[idx][1][1]+1
                body_end = li[i][1][0]-1
                body = text[body_start:body_end+1]
                chunks[li[idx][0]] = body
                # print('body : ' , body)
            # else :
                # print()
            idx = i

    chunks[li[idx][0]] = text[li[idx][1][1]+1 :]
    return chunks

    