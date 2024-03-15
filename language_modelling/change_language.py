from utils import llm


def enhanced_extraction(overview_text:str):
    print('Inside enhanced_extraction')
    lines = overview_text.split('\n')
    text = ''
    special_words = {}
    for line in lines:
        if ':' in line:
            l = line.split(':')
            sub_heading = l[0].strip()
            sub_text = l[1].strip()
            special_words[sub_heading] = sub_text
        else :
            text += '\n' + line

    special_words['text'] = text
    return special_words

#_______________________________________________________________________________________________________________________

async def language_translator(text:str, base_lang, target_lang):
    template = '''
        Your job is of translating the below text from {base_lang} to {target_lang} language.

        TEXT in {base_lang} : {text}

        Return Instructions :
        - return the translated text in {target_lang} language.
    '''

    response = await llm.generate_response(template.format(base_lang = base_lang, target_lang = target_lang, text = text))
    print('Inside language_translator' , response)
    return response.strip()

#_______________________________________________________________________________________________________________________

