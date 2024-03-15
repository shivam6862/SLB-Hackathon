from chunk_headings import find_heading_indices, create_chunks
from change_language import enhanced_extraction, language_translator

def first_translate_notice(notice:str):
    print('Inside first_translate_notice')
    headings_with_indices, lang = find_heading_indices(notice)
    chunks :dict[str, str] = create_chunks(headings_with_indices, notice, lang)
    

    # first of all translating text to english
    final_dict = {}
    for key in chunks.keys():
        
        translated_key =  language_translator(key, lang, 'en')
        if key.strip().lower() == 'overview':
            special_dict = enhanced_extraction(chunks[key])
            sub_dict = {}
            for sub_key in special_dict.keys():
                translated_sub_key = language_translator(sub_key, lang, 'en')
                translated_value = language_translator(special_dict[sub_key], lang, 'en')
                sub_dict[translated_sub_key] = translated_value
            
            final_dict[translated_key] = sub_dict

        elif key.strip().lower() == 'Emergency Contact Numbers':   # no need to translate numbers
            final_dict[translated_key] = chunks[key]

        else:
            translated_value = language_translator(chunks[key], lang, 'en')
            final_dict[translated_key] = translated_value

    return final_dict


#_______________________________________________________________________________________________________________________

async def translate_v2(structured_notice :dict, target_lang:str, base_lang:str = 'English')->str:
    print('Inside translate_v2')
    final_dict = {}
    for key in structured_notice.keys():
        translated_key =  language_translator(key, base_lang, target_lang)
        if key.strip().lower() == 'emergency contact numbers':
            final_dict[translated_key] = structured_notice[key]

        elif key.strip().lower() == 'overview':
            sub_dict = {}
            for sub_key in structured_notice[key].keys():
                translated_sub_key = language_translator(sub_key, base_lang, target_lang)
                translated_value = language_translator(structured_notice[key][sub_key], base_lang, target_lang)
                sub_dict[translated_sub_key] = translated_value
            
            final_dict[translated_key] = sub_dict
        
        else :
            translated_value = language_translator(structured_notice[key], base_lang, target_lang)
            final_dict[translated_key] = translated_value

    return final_dict


async def produce_translations(notice:str)->dict:
    print('Inside produce_translations')
    structured_notice = first_translate_notice(notice)
    print('structured_notice : ' , structured_notice)
    translations = {}
    translations['English'] = structured_notice
    for lang in ['French' , 'Hindi' ,'Tamil']:
        translations[lang] = await translate_v2(structured_notice, lang)
    
    return translations


    
                
        
