
function main () {

     document.querySelector('.foryou').addEventListener('click', e => {
          document.querySelector('.foryou div').style.backgroundColor = "#51a2ff";
          document.querySelector('.following div').style.backgroundColor = "transparent";
     });

     document.querySelector('.following').addEventListener('click', e => {
          document.querySelector('.foryou div').style.backgroundColor = "transparent";
          document.querySelector('.following div').style.backgroundColor = "#51a2ff";
     });

}

main()