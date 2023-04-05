'use strict';

const form = document.querySelector('.form');
const inputType = document.querySelector('.form__input--type');
const OD_L = document.querySelector('.form__input--1');
const ID_L = document.querySelector('.form__input--2');
const OD_csg = document.querySelector('.form__input--3');
const ID_csg = document.querySelector('.form__input--4');
const D_hole = document.querySelector('.form__input--5');
const WT = document.querySelector('.form__input--6');
const VOL = document.querySelector('.form__input--7');
const D1 = document.querySelector('.form__input--8');
const D2 = document.querySelector('.form__input--9');
const D3 = document.querySelector('.form__input--10');
const D4 = document.querySelector('.form__input--11');
const E_F = document.querySelector('.form__input--12');

const map = document.getElementById('map');
const answer = document.querySelector('.answer');
const btn__submit = document.querySelector('.form__btn');
const btn__reset = document.querySelector('.reset');

const validInputs = inputs => inputs.every(inp => Number.isFinite(inp));

const allPositive = inputs => inputs.every(inp => inp >= 0);

function slurry_wt(WT_, VOL_) {
  return WT_ / VOL_;
}

function slurry_yield(VOL_) {
  return VOL_ / 7.48;
}

function slurry_vol(ID_csg_, OD_L_, D1_, D_hole_, D2_, E_F_, D3_, ID_L_, D4_) {
  const sv =
    5.454153912 *
    0.001 *
    ((Math.pow(ID_csg_, 2) - Math.pow(OD_L_, 2)) * D1_ +
      (Math.pow(D_hole_, 2) - Math.pow(OD_L_, 2)) * D2_ * E_F_ +
      Math.pow(D_hole_, 2) * D3_ * E_F_ +
      Math.pow(ID_L_, 2) * D4_);

  return sv;
}

function no_of_sk_cement(sl_vol_, sl_y_) {
  return sl_vol_ / sl_y_;
}

const handler = function () {
  const in_OD_L = Number(OD_L.value);
  const in_ID_L = Number(ID_L.value);
  const in_OD_csg = Number(OD_csg.value);
  const in_ID_csg = Number(ID_csg.value);
  const in_D_hole = Number(D_hole.value);
  const in_WT = Number(WT.value);
  const in_VOL = Number(VOL.value);
  const in_D1 = Number(D1.value);
  const in_D2 = Number(D2.value);
  const in_D3 = Number(D3.value);
  const in_D4 = Number(D4.value);
  const in_E_F = Number(E_F.value);

  const inputs = [
    in_OD_L,
    in_ID_L,
    in_OD_csg,
    in_ID_csg,
    in_D_hole,
    in_WT,
    in_VOL,
    in_D1,
    in_D2,
    in_D3,
    in_D4,
    in_E_F,
  ];

  if (!validInputs(inputs) || !allPositive(inputs))
    return alert('Inputs have to be positive numbers!');

  const sl_wt = slurry_wt(in_WT, in_VOL);
  const sl_y = slurry_yield(in_VOL);
  const sl_vol = slurry_vol(
    in_ID_csg,
    in_OD_L,
    in_D1,
    in_D_hole,
    in_D2,
    in_E_F,
    in_D3,
    in_ID_L,
    in_D4
  );
  const no_sk = no_of_sk_cement(sl_vol, sl_y);

  const output = `Slurry WT = ${sl_wt.toFixed(3)}<br>
                  Slurry Yield = ${sl_y.toFixed(3)}<br>
                  Slurry VOL = ${sl_vol.toFixed(3)}<br>
                  No. of SK Cement = ${no_sk.toFixed(3)}`;

  answer.style.backgroundColor = '#00c46a';
  answer.style.color = '#ececec';
  answer.style.border = '50px solid #00c46a';
  answer.innerHTML = output;

  inputs.forEach(element => {
    console.log(element);
  });
};

btn__submit.addEventListener('click', handler);
btn__submit.addEventListener('submit', handler);

btn__reset.addEventListener('click', () => {
  location.reload();
});
