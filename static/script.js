let input = document.getElementById("hash_entry");
full_compute(input.value);

input.onkeyup = function() {
  do_search(input.value);
};

var do_search = debounce(function(input) {
  full_compute(input);
}, 250);

// Compute and display all hashes
function full_compute(input) {
  const Http = new XMLHttpRequest();
  const url = "/search.json?q=" + input;
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = e => {
    var response = e.target.response;

    target = document.getElementById("content");

    result = {};

    if (response.length > 0) {
      result = JSON.parse(e.target.response);
      console.log(result);
    } else {
      console.log("<p>No results found. 1</p>");
      // target.innerHTML = "<p>No results found. 1</p>";
      return;
    }
    if (result.statuscode !== 200) {
      console.log("<p>No results found. 2</p>");
      // target.innerHTML = "<p>No results found. 2</p>";
      return;
    }

    content = "<ul>";
    for (var i = 0; i < result.data.length; i++) {
      content += "<li>";
      content += "<a href='/" + result.data[i].Name + "'>";
      content += result.data[i].Name;
      content += "</a>";
      content += "</li>";
    }
    content += "</ul>";
    target.innerHTML = content;
  };
}

// Compute and display character information
function chars_info(input) {
  let out = "";

  // https://mathiasbynens.be/notes/javascript-unicode
  let stringarr = Array.from(input);

  if (stringarr.length > 0) {
    out +=
      "<tr>" +
      "<th>Letter</th>" +
      "<th>Unicode</th>" +
      "<th>Dec / Hex</th>" +
      "</tr>";
  }

  for (var i = 0; i < stringarr.length; i++) {
    let letter = stringarr[i];
    let code = letter.codePointAt();
    let hex_code = code.toString(16).toUpperCase();
    let unicode = "U+" + hex_code.padStart(4, "0");

    out +=
      "<tr>" +
      "<td><span class='char'><b>" +
      letter +
      "</b></span></td>" +
      "<td><a href='https://www.compart.com/en/unicode/" +
      unicode +
      "'>" +
      unicode +
      "</a></td>" +
      "<td>" +
      code +
      " / 0x" +
      hex_code +
      "</td>" +
      "</tr>";
  }
  return out;
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
