import Malaysia from './malaysia.js'

const RoutesCtrl = {}


RoutesCtrl.init = (isDesktop) => {
  if (isDesktop){
    //return all controllers
    return [Malaysia.MapCtrl1(), Malaysia.MapCtrl2()]
  } else {
    return [Malaysia.MapCtrlM1(), Malaysia.MapCtrlM2(), Malaysia.MapCtrlM3()]
  }
}

export default RoutesCtrl
