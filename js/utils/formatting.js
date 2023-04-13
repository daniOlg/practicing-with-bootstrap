function formatRut(rut) {
  rut = rut.substring(0,rut.length-1)+'-'+rut.substring(rut.length-1,rut.length)
  let formatted = ''
  
  for(let i = 0; i < rut.length; i++) {
    if((rut.length-i-2)%3 == 0 && i<rut.length-2) formatted += '.';
    formatted += rut[i];
  }

  return formatted;
}

const formatting = {
  formatRut
}