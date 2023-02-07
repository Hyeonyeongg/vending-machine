class Vendingmachine {
    constructor() {
        const vMachine = document.querySelector('.vending-machine');
        this.balance = vMachine.querySelector('.txt-balance');
        this.itemList = vMachine.querySelector('.list-item');
        this.inputCostEl = vMachine.querySelector('.inp-put');
        this.btnPut = vMachine.querySelector('.btn-put');
        this.btnReturn = vMachine.querySelector('.btn-return');
        this.btnGet = vMachine.querySelector('.btn-get');
        this.stagedList = vMachine.querySelector('.list-item-staged');


        const myinfo = document.querySelector('.my-info');
        this.myMoney = myinfo.querySelector('.txt-mymoney');
        this.gotList = myinfo.querySelector('.list-item-staged');
        this.txtTotal = myinfo.querySelector('.txt-total');
    }
    setup() {
        this.bindEvents(); //이벤트리스너 작동.
    }

    // 선택한 음료수 목록 생성
    stagedItemGenerator(target) {
        const stagedItem = document.createElement('li');
        stagedItem.dataset.item = target.dataset.item; //획득 버튼을 눌렀을 때 동일한 정보를 획득한 음료에 넣어줘야하기때문
        stagedItem.dataset.price = target.dataset.price;
        stagedItem.innerHTML = `
    <button type="button" class="btn-staged">
            <img src="./src/images/${target.dataset.img}" alt="" class="img-item">
            <strong class="txt-item">${target.dataset.item}</strong>
            <span class="num-counter">1</span>
            </button>
        `;
        this.stagedList.appendChild(stagedItem);
    }

    //이벤트와 관련된 함수를 모음
    bindEvents() {

        // 입금 버튼 기능
        this.btnPut.addEventListener('click', (event) => {
            const inputCost = parseInt(this.inputCostEl.value); 
            const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(',', '')); 
            const balanceVal = parseInt(this.balance.textContent.replaceAll(',', ''));


            //입금액이 입력되었을 때만 작동. 아무것도 입력하지 않고 입력을 누르는 것을 방지.
            if (inputCost) {
                if (inputCost <= myMoneyVal && inputCost > 0) {
                    //Intl.NumberFormat : 언어에 맞는 숫자 서식을 문자열로 반환. IE11 부터 지원 
                    this.myMoney.textContent = new Intl.NumberFormat().format(myMoneyVal - inputCost) + ' 원'; 
                    this.balance.textContent = new Intl.NumberFormat().format((balanceVal ? balanceVal : 0) + inputCost) + ' 원';
                } else { //입금액이 소지금보다 많다면
                    alert("소지금이 부족합니다.");
                }
                this.inputCostEl.value = null;
            }
        })


        // 거스름돈 반환 버튼 기능
        this.btnReturn.addEventListener('click', (event) => {
            const balanceVal = parseInt(this.balance.textContent.replaceAll(',', ''));
            const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(',', ''));

            if (balanceVal) {
                this.myMoney.textContent = new Intl.NumberFormat().format(balanceVal + myMoneyVal) + ' 원';
                this.balance.textContent = '원';
            }
        })


        // 자판기 메뉴 기능
        const btnsCola = this.itemList.querySelectorAll('button'); 
        
        btnsCola.forEach((item) => {
            item.addEventListener('click', (event) => {
                const targetEl = event.currentTarget;
                const balanceVal = parseInt(this.balance.textContent.replaceAll(',', ''));
                let isStaged = false; // 이미 선택되었는가?
                const targetElPrice = parseInt(targetEl.dataset.price);
                const stagedListItem = this.stagedList.querySelectorAll('li');


                // 입금된 금액이 음료수 값보다 많거나 같을 경우
                if (balanceVal >= targetElPrice) {
                    this.balance.textContent = new Intl.NumberFormat().format(balanceVal - targetElPrice) + ' 원';

                    for (const item of stagedListItem) {  // 클릭한 음료수가 내가 이미 선택한 아이템인지 탐색
                        if (item.dataset.item === targetEl.dataset.item) { //내가 클릭한 상품과 내가 담은 상품이 같을 경우
                            item.querySelector('.num-counter').textContent++;
                            isStaged = true;
                            break;
                        }
                    };

                    // 해당 아이템을 처음 선택했을 경우
                    if (!isStaged) {
                        this.stagedItemGenerator(targetEl);
                    }

                    // 콜라의 갯수를 줄임.
                    targetEl.dataset.count--;

                    if (parseInt(targetEl.dataset.count) === 0) { // 상품이 소진되면 품절 표시
                        targetEl.parentElement.classList.add('sold-out');
                        const warning = document.createElement('em');
                        warning.textContent = '해당상품은 품절입니다.';
                        warning.classList.add('ir');
                        targetEl.parentElement.insertBefore(warning, targetEl);
                    }

                } else {
                    alert("잔액이 부족합니다. 돈을 입금해주세요");
                }
            })
        })

        // 획득 버튼 기능
        this.btnGet.addEventListener('click', (event) => {
            let isGot = false;
            let totalPrice = 0;

            // 내가 고른 음료수 목록과 이미 구입한 목록을 비교
            for (const itemStaged of this.stagedList.querySelectorAll('li')) {
                for (const itemGot of this.gotList.querySelectorAll('li')) {
                    let itemGotCount = itemGot.querySelector('.num-counter');
                    // 획득할 아이템이 이미 획득한 음료 리스트에 존재하는지 확인
                    if (itemStaged.dataset.item === itemGot.dataset.item) {
                        //획득한 음료 리스트의 아이템 갯수 업데이트 
                        itemGotCount.textContent = parseInt(itemGotCount.textContent) + parseInt(itemStaged.querySelector('.num-counter').textContent);
                        isGot = true;
                        break;
                    }
                }
                // 처음 획득하는 음료수라면
                if (!isGot) {
                    this.gotList.appendChild(itemStaged);
                }
                isGot = false;
            }

            // stagedList 목록의 내용을 초기화
            this.stagedList.innerHTML = null;

            // 획득한 음료 리스트를 순환하면서 총 금액을 계산.
            this.gotList.querySelectorAll('li').forEach((itemGot) => {
                totalPrice += itemGot.dataset.price * parseInt(itemGot.querySelector('.num-counter').textContent);
            });
            this.txtTotal.textContent = `총금액 : ${new Intl.NumberFormat().format(totalPrice)}원`;
        });


    }


}


export default Vendingmachine