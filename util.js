function parseTime(t){
    if (t.endsWith('am')){
        return t.slice(0, -2)
    } else if (t.endsWith('pm')){
        let k = t.split(':')
        
        k[0] = String(Number(t[0])+12)
        
        
        k.join(':')
        
        return k.join(':').slice(0, -2);

    } else {
        return t
    }
}

module.exports = parseTime