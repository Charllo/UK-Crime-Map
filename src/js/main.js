function sleep(ms){
  // https://stackoverflow.com/a/39914235/6396652
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mode(c){

  // NOT WORKING

  var previous = 0;
  var popular = "";
  for (var i in c){
    if (c[i] > previous){
      popular = i;
    }
  }
  return popular;
}

// async because if not, sleep cant be awaited therefore wont work
async function fade_out(id){
  var e = document.getElementById(id);
  var op = window.getComputedStyle(e).getPropertyValue("opacity");
  while (op > 0.05){
    op -= 0.05;
    e.style.opacity = op;
    await sleep(10);
  }
  e.style.opacity = 0;
  e.style.display = "none";
}

async function fade_in(id){
  var e = document.getElementById(id);
  var op_s = window.getComputedStyle(e).getPropertyValue("opacity");
  op = parseFloat(op_s);  // Starts as a string for some reason
  e.style.display = "block";
  while (op < 0.95){
    op += 0.05;
    e.style.opacity = op;
    await sleep(10);
  }
  e.style.opacity = 1;
}
