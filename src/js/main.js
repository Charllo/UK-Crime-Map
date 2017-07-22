function sleep(ms){
  // https://stackoverflow.com/a/39914235/6396652
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mode(c){
  var popular_str = "";
  var popular_num = 0;

  for (item in c){
    num = c[item]
    if (num > popular_num){
      popular_str = item;
      popular_num = num;
    }
  }

  return popular_str;
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

function show_by_id(id){
  document.getElementById(id).style.display = "block";
}

function hide_by_id(id){
  document.getElementById(id).style.display = "none";
}
