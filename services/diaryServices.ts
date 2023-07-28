import diaryEntries from '../data/diaries';

import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

import { GraphQLError } from 'graphql';

export const getAllEntries = (): DiaryEntry[] => {
    return diaryEntries;
};

export const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaryEntries.map(( { id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility 
    }))
}

export const addEntry = (entry : NewDiaryEntry): NewDiaryEntry => {
    
    const NewDiaryEntry = {
        id: Math.max(...diaryEntries.map((d) => d.id)) + 1,
        ...entry
    }

    diaryEntries.push(NewDiaryEntry);
    return NewDiaryEntry;
}

export const findById = (id: number): DiaryEntry => {
    const entry = diaryEntries.find((item) => item.id === id);
    
    if(entry){
        return entry
    } else {
        throw new GraphQLError("Not found!", {
            extensions: {
                code: "BAD_USER_INPUT",
                invalidArga: id
            }
        })
    }
};