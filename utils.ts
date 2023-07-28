import { NewDiaryEntry, Visibility, Weather } from "./types";

//eslint-disable @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseComment = (comment: any): string => {
    if (!comment || !isString(comment)) {
      throw new Error('Incorrect or missing comment: ' + comment);
    }
    return comment;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isWeather = (param: any): boolean => {
    return Object.values(Weather).includes(param);
};

const parseWeather = (weather: any): Weather => {
    if(!weather || !isWeather(weather)) {
        throw new Error("Incorrect or missing weather "+ weather);
    }
    return weather;
};

const isVisibility = (param: any): boolean => {
    return Object.values(Visibility).includes(param);
  };
  
const parseVisibility = (visibility: any): Visibility => {
    if (!visibility || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility);
    }
    return visibility;
};

export const toNewDiaryEntry = (object: any): NewDiaryEntry => {

    return {
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      comment: parseComment(object.comment),
    };

};