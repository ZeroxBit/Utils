//combierte objetos a string !!
export const objectToString = obj => {
  return !!obj && validateType(obj, "object") ? JSON.stringify(obj) : obj;
};

// combierte un string a objecto valido !!
export const stringToObject = str => {
  if (!noIsNull(str)) return str;
  return JSON.parse(str);
};

/**
 * valida el tipo de valor de una variable !!
 * @param {any} value El valor a evaluar
 * @param {string} type el tipo de valor al que se va a evaluar
 */
export const validateType = (value, type) => typeof value === type;

/**
 * valida si un objeto esta vacio !!
 * @param {Object} obj Objeto a validar !!
 */
export const validateLentObject = obj => {
  return !!obj && !!Object.keys(obj).length;
};

/**
 * Capitaliza el primer caracter del string !!
 * @param str El string a Capitalizar
 */
export const capitalizeFirst = str => {
  if (!noIsNull(str)) return str;
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Toma las primeras letras sepadaras por punto y las convierte en mayuculas !!
 * @param str El string a tratar
 * @param parse El caracter por el cuar se va a parsear el string!!
 */
export const capitalize = (str, parse = " ") => {
  if (!noIsNull(str)) return str;

  str = str.trim();

  str = str.toLowerCase();

  return str
    .split(parse)
    .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(parse);
};

/**
 * Sanatiza la url
 * @param {string} str la url que se recibe
 * @param {string} to el caracter que se va a reemplazar
 * @param {string} from el caracter sustituto
 */
export const sanitizeStr = (str, to = "-", from = " ") => {
  if (!noIsNull(str)) return str;

  let newStr = "";
  newStr = str.split(to);

  return newStr.join(from);
};

/**
 * Toma las primeras letras sepadaras por punto y las convierte en mayuculas !!
 * @param str El string a tratar
 * @param parse El caracter por el cuar se va a parsear el string!!
 */
export const extractCharacters = (str, parse = " ") => {
  const name = str.split(parse);
  let letrasIcon = "";

  for (const letra of name) {
    letrasIcon += letra.trim().charAt(0);
  }

  return letrasIcon.toLocaleUpperCase();
};

/**
 * Cambia la cadena a mayuscula o miniscula
 * @param {Cadena a tratar} str [String]
 * @param {Condicion [lower, upper]} condition [string]
 */
export const lowerOrUpper = (str, condition = "lower") => {
  if (!noIsNull(str)) return str;

  if (condition === "lower") {
    return str.toLowerCase();
  }
  return str.toUpperCase();
};

/**
 * Corta un string y lo concatena con "..."
 * @param {string} str El string a ser tratado
 * @param {number} max El maximo de caracterres permitidos
 */
export const cutCharacters = (str, max = 17) => {
  if (!noIsNull(str)) return;

  const concatEnd = "...";
  if (str.length > max) {
    const newStr = str.substr(0, max) + concatEnd;
    return newStr;
  }
  return str;
};

// variable que chekea si una variable tiene algo !!
// regresa false si es nulo el valor, regresar verdadero si tiene algo
const noIsNull = value => !!value && value !== "undefined" && value !== null;

/**
 * Combina la camtidad de funciones necesarias y retorna el resultado de ellas
 * Se le pasa un parametro el cual sera tratado por las funciones que se envien en el
 * la segunda funcion, se puede mandar mas 1 una funcion.
 * @param {el parametro a tratar} param [any]
 * @param {recibe una o mas funciones separadas por ","} funcs [func, array[func]]
 */
export const combineFunc = param => (...funcs) => {
  let newParam = param;

  for (const func of Object.values(funcs)) {
    newParam = func(newParam);
  }

  return newParam;
};

/**
 * Combierte un numero plano en decimal, separado por comas
 * @param {string} number Numbero a ser convertido
 */
export const transforFormatNumber = number => {
  if (typeof number === "number") {
    number = number.toString();
  }

  let result;
  let str = [];
  const reg = new RegExp(/(\d*(\d{2}\.)|\d{1,3})/, "gi");
  const reversed = number
    .split("")
    .reverse()
    .join("");

  while ((result = reg.exec(reversed))) {
    str.push(result[2] ? result[2] : result[0]);
  }

  return str
    .join(",")
    .split("")
    .reverse()
    .join("")
    .replace(",.", ".");
};

/**
 * suma todos los numeros de un array
 * @param {array} array el array a evaluar
 */
export const selfSum = array => {
  if (typeof array !== "object" || !array.length) return 0;

  const sum = array
    .map(n => typeof n === "number" && n)
    .reduce((a, b) => a + b);

  return typeof sum === "number" ? sum : 0;
};

/**
 * Transforma un monto entero, a decimales y mostrar la separacion por ","
 * @param {string} amount Monto a formatear !!
 * @param {number} decimals Cantidad de deciales a mostrar !!
 */
export const numberFormat = (amount, decimals = 0) => {
  if (typeof amount === "number") {
    // por si pasan un numero en vez de un string
    amount = amount.toString();
  }

  amount = parseFloat(amount.replace(/[^0-9\.]/g, "")); // elimino cualquier cosa que no sea numero o punto

  // si no es un numero o es igual a cero retorno el mismo cero
  if (isNaN(amount) || amount === 0) return parseFloat(0).toFixed(decimals);

  // si es mayor o menor que cero retorno el valor formateado como numero
  amount = "" + amount.toFixed(decimals);

  let amount_parts = amount.split("."),
    regexp = /(\d+)(\d{3})/;

  while (regexp.test(amount_parts[0]))
    amount_parts[0] = amount_parts[0].replace(regexp, "$1" + "," + "$2");

  return amount_parts.join(".");
};

// valida que solo se puedan digitar numeros !!
export const validaNumericos = event => {
  if (event.charCode >= 48 && event.charCode <= 57) {
    return true;
  }
  return false;
};

export const replaceCharacter = (str, searchCharacter, replaceCharacter) => {
  if (!noIsNull(str)) return;
  str = transformString(str);

  return str.replace(searchCharacter, replaceCharacter || "");
};

/**
 * @param {any} value transforma el valor a un string o si es string solo lo regresa !!
 */
export const transformString = value => {
  if (typeof value !== "string") {
    value = value.toString();
  }
  return value;
};
