export const sqlInsertToJsonObject = (query: string, values:any[]) => {
    const openIndex = query.indexOf("(")+1;
    const closeIndex = query.indexOf(")");

    return query.substring(openIndex,closeIndex).split(",").reduce((prev, next, i) =>({...prev, [next]:values[i]}), {});
};