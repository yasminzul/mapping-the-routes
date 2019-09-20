import Malaysia from './malaysia.js'

const RoutesCtrl = {}

RoutesCtrl.init = (isDesktop) => {
  if (isDesktop){
    //return all controllers
    return [Malaysia.MapCtrl1()]
  } else {
    return [Malaysia.MapCtrlM1()]
  }
}

export default RoutesCtrl