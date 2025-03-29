 export const API_KEY = 'AIzaSyC6Z1alGQLkfChJV1kPHeoB2s4bt2IqsT0';

  export const value_converter = (value) => {
  if(value>= 1000000)
    {
    return Math.floor (value/1000000) + 'M';
  }
  else if(value>= 1000){
    return Math.floor (value/1000) + 'K';
  }
  else{
    return value;
  }
 }