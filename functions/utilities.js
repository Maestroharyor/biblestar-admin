export const Capitalize = ([first, ...rest]) => {
    if(first === undefined){
        return ""
    } else{
       return first.toUpperCase() + rest.join('') 
    }
    
}