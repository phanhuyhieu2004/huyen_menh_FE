


export function getZodiacSign(day, month) {
    if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) return { name: "Ma Kết (Capricorn)", icon: "♑", element: "Đất", ruler: "Sao Thổ" };
    if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) return { name: "Bảo Bình (Aquarius)", icon: "♒", element: "Khí", ruler: "Sao Thiên Vương" };
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return { name: "Song Ngư (Pisces)", icon: "♓", element: "Nước", ruler: "Sao Hải Vương" };
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return { name: "Bạch Dương (Aries)", icon: "♈", element: "Lửa", ruler: "Sao Hỏa" };
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return { name: "Kim Ngưu (Taurus)", icon: "♉", element: "Đất", ruler: "Sao Kim" };
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return { name: "Song Tử (Gemini)", icon: "♊", element: "Khí", ruler: "Sao Thủy" };
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return { name: "Cự Giải (Cancer)", icon: "♋", element: "Nước", ruler: "Mặt Trăng" };
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return { name: "Sư Tử (Leo)", icon: "♌", element: "Lửa", ruler: "Mặt Trời" };
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return { name: "Xử Nữ (Virgo)", icon: "♍", element: "Đất", ruler: "Sao Thủy" };
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return { name: "Thiên Bình (Libra)", icon: "♎", element: "Khí", ruler: "Sao Kim" };
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return { name: "Bọ Cạp (Scorpio)", icon: "♏", element: "Nước", ruler: "Sao Diêm Vương" };
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return { name: "Nhân Mã (Sagittarius)", icon: "♐", element: "Lửa", ruler: "Sao Mộc" };
    return { name: "Không xác định", icon: "✨" };
}


function sumDigitsReduce(num) {
    let sum = num.toString().split('').reduce((acc, val) => acc + parseInt(val), 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = sum.toString().split('').reduce((acc, val) => acc + parseInt(val), 0);
    }
    return sum;
}


export function getNumerologyCycles(dobDateStr) {

    if (!dobDateStr) return { personalYear: 1, personalMonth: 1, personalDay: 1 };

    const dob = new Date(dobDateStr);
    const today = new Date();

    const birthMonth = dob.getMonth() + 1;
    const birthDay = dob.getDate();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDayStr = today.getDate();


    const personalYear = sumDigitsReduce(sumDigitsReduce(birthMonth) + sumDigitsReduce(birthDay) + sumDigitsReduce(currentYear));

    const personalMonth = sumDigitsReduce(personalYear + sumDigitsReduce(currentMonth));

    const personalDay = sumDigitsReduce(personalMonth + sumDigitsReduce(currentDayStr));

    return { personalYear, personalMonth, personalDay };
}


export function getBiorhythms(dobDateStr) {
    if (!dobDateStr) return { physical: 0, emotional: 0, intellectual: 0, spiritual: 0, daysLived: 0 };

    const dob = new Date(dobDateStr);
    const today = new Date();


    dob.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);


    const diffTime = Math.abs(today - dob);
    const t = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


    const calc = (cycle) => Math.round(Math.sin((2 * Math.PI * t) / cycle) * 100);

    return {
        daysLived: t,
        physical: calc(23),
        emotional: calc(28),
        intellectual: calc(33),
        spiritual: calc(53)
    };
}


export function getElementRelations(elementName) {

    const core = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'].find(e => productNameContains(elementName, e));
    if (!core) return { sinh: 'Mộc', khac: 'Thủy', thinh: 'Hỏa', tu: 'Kim', phat: 'Thổ' };

    const relations = {
        'Kim': { sinhOut: 'Thủy', sinhIn: 'Thổ', khacOut: 'Mộc', khacIn: 'Hỏa' },
        'Mộc': { sinhOut: 'Hỏa', sinhIn: 'Thủy', khacOut: 'Thổ', khacIn: 'Kim' },
        'Thủy': { sinhOut: 'Mộc', sinhIn: 'Kim', khacOut: 'Hỏa', khacIn: 'Thổ' },
        'Hỏa': { sinhOut: 'Thổ', sinhIn: 'Mộc', khacOut: 'Kim', khacIn: 'Thủy' },
        'Thổ': { sinhOut: 'Kim', sinhIn: 'Hỏa', khacOut: 'Thủy', khacIn: 'Mộc' }
    };

    return relations[core];
}

function productNameContains(fullString, substr) {
    if (!fullString) return false;
    return fullString.toLowerCase().includes(substr.toLowerCase());
}


export function getDailyHexagram(dobDateStr) {

    const hexagrams = [
        { id: 1, name: "Thuần Càn", meaning: "Sáng tạo mãnh liệt, năng lượng dương tuôn trào. Hãy chủ động tiến bước.", lines: [1, 1, 1, 1, 1, 1] },
        { id: 2, name: "Thuần Khôn", meaning: "Sự tiếp nhận, bao dung. Nuôi dưỡng và chờ đợi thời cơ chín muồi.", lines: [0, 0, 0, 0, 0, 0] },
        { id: 11, name: "Địa Thiên Thái", meaning: "Thiên địa giao hòa. Mọi sự hanh thông, là lúc tốt nhất để hợp tác.", lines: [0, 0, 0, 1, 1, 1] },
        { id: 12, name: "Thiên Địa Bĩ", meaning: "Bế tắc tạm thời. Hãy giữ mình, trau dồi nội tại, đừng nóng vội.", lines: [1, 1, 1, 0, 0, 0] },
        { id: 14, name: "Hỏa Thiên Đại Hữu", meaning: "Sự sung túc rực rỡ. Năng lượng dồi dào, thuận lợi tài lộc.", lines: [1, 0, 1, 1, 1, 1] },
        { id: 29, name: "Khảm Vi Thủy", meaning: "Thử thách chập trùng. Cần giữ tâm vững vàng như dòng nước sâu.", lines: [0, 1, 0, 0, 1, 0] },
        { id: 30, name: "Ly Vi Hỏa", meaning: "Trí tuệ tỏa sáng. Rực rỡ nhưng cần cẩn trọng tránh phô trương thái quá.", lines: [1, 0, 1, 1, 0, 1] },
        { id: 63, name: "Thủy Hỏa Ký Tế", meaning: "Khởi đầu mới hoàn hảo, nhưng hãy cẩn thận duy trì thành quả.", lines: [0, 1, 0, 1, 0, 1] },
        { id: 64, name: "Hỏa Thủy Vị Tế", meaning: "Chưa hoàn tất. Mọi thứ còn dang dở, cần một cú hích cuối cùng.", lines: [1, 0, 1, 0, 1, 0] },
    ];

    let seedDate = new Date();
    if (dobDateStr) {

        let hash = 0;
        for (let i = 0; i < dobDateStr.length; i++) {
            hash = dobDateStr.charCodeAt(i) + ((hash << 5) - hash);
        }


        seedDate = new Date();
        const base = hash + seedDate.getDate() + seedDate.getMonth() + seedDate.getFullYear();

        const index = Math.abs(base) % hexagrams.length;
        return hexagrams[index];
    }


    return hexagrams[Math.floor(Math.random() * hexagrams.length)];
}