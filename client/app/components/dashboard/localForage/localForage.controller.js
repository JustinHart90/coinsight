'use strict'

export default function LocalForageController () {
  const vm = this;
  vm.$onInit = $onInit;
  // vm.getName = getName();
  console.log('localForage');

  function $onInit () {
    // getName();
    // $log.log('localForage', $localForage);
  }

  // function getName () {
  //   $localForage.setItem('myName','Justin Hart').then(() => {
  //     $localForage.getItem('myName').then(data => {
  //       var myName = data;
  //     });
  //   });
  // }
}
