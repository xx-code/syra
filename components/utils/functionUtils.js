import React, {Component} from 'react';

export const refactor = (text) => {
    let change = text.replace(/\s/g, "_").replace(/,/g, "-").replace(/\//g, ".");

    return change;
}

export const initalRefactor = (text) => {
    let change = text.replace(/_/g, " ").replace(/-/g, ",").replace(/\./g, "/");
    return change;
}

export const verifyPathsThere = (places, place) => {
    let array = [];
    let isThere = false;

    for(let i = 0; i < places.length; i++){
        if(places[i].place === place){
            isThere = true;
            array = places[i].paths
        }
    }

    return ({
        isThere : isThere,
        pathsThere : array
    })
}