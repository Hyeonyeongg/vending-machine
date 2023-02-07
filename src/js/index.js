import ColaGenerator from "./components/colaGenerator.js";
import Vendingmachine from "./components/vendingmachine.js";

const colaGenerator = new ColaGenerator(); //인스턴스 생성. 인스턴스에서 setup함수만 실행시켜주면 됨.
const vendingmachine = new Vendingmachine();

// 탑레벨 await는 최상위 모듈에서만 작동하며, async 함수만 사용할 수 있음.
await colaGenerator.setup(); 
vendingmachine.setup(); 


