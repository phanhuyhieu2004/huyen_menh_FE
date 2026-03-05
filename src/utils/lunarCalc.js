

const ZODIAC_HOURS = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];


export function getCanChiDay(date) {

    const baseDate = new Date('2024-01-20');
    const diffTime = date.getTime() - baseDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const cycleIndex = ((diffDays % 60) + 60) % 60;
    const canIndex = cycleIndex % 10;
    const chiIndex = cycleIndex % 12;

    return {
        name: `${CAN[canIndex]} ${CHI[chiIndex]}`,
        can: CAN[canIndex],
        chi: CHI[chiIndex]
    };
}


const AUSPICIOUS_HOURS_MAP = {
    'Tý': [0, 1, 4, 5, 8, 10],
    'Ngọ': [0, 1, 4, 5, 8, 10],
    'Sửu': [1, 2, 5, 6, 9, 10],
    'Mùi': [1, 2, 5, 6, 9, 10],
    'Dần': [0, 1, 3, 6, 8, 11],
    'Thân': [0, 1, 3, 6, 8, 11],
    'Mão': [1, 2, 4, 7, 9, 10],
    'Dậu': [1, 2, 4, 7, 9, 10],
    'Thìn': [0, 2, 3, 5, 8, 11],
    'Tuất': [0, 2, 3, 5, 8, 11],
    'Tỵ': [1, 3, 4, 6, 9, 11],
    'Hợi': [1, 3, 4, 6, 9, 11]
};


export function getScoredHours(date, userProfile, dailyEnergy) {
    const dayCanChi = getCanChiDay(date);
    const auspiciousIndices = AUSPICIOUS_HOURS_MAP[dayCanChi.chi] || [0, 1, 4, 5, 8, 10];


    let userElement = 'Thủy';
    const rawElements = userProfile.elements || userProfile.element;
    if (rawElements) {
        try {
            const elements = typeof rawElements === 'string' ? JSON.parse(rawElements) : rawElements;
            userElement = elements.nguHanh || elements || 'Thủy';
        } catch (e) {
            userElement = rawElements || 'Thủy';
        }
    }

    const hourPriorities = {
        'Thủy': ['Tý', 'Thân'],
        'Mộc': ['Dần', 'Mão'],
        'Hỏa': ['Tỵ', 'Ngọ'],
        'Thổ': ['Thìn', 'Tuất', 'Sửu', 'Mùi'],
        'Kim': ['Thân', 'Dậu']
    };
    const userPriorities = hourPriorities[userElement] || [];


    const dayNumber = dailyEnergy.personalDayNumber || 1;
    const dayElement = getElementFromNumber(dayNumber);
    const dayRelationScore = getElementRelationScore(dayElement, userElement);

    const scoredHours = ZODIAC_HOURS.map((name, index) => {
        let score = 0;
        let reasons = [];


        if (auspiciousIndices.includes(index)) {
            score += 10;
            reasons.push("Giờ Hoàng Đạo cố định");
        } else {
            score -= 5;
        }


        if (userPriorities.includes(name)) {
            score += 8;
            reasons.push(`Giờ vàng Cực hợp mệnh ${userElement}`);
        }


        if (dayRelationScore > 0 && userPriorities.includes(name)) {
            score += 3;
            reasons.push(`Ngày Sinh mệnh (${dayElement} -> ${userElement})`);
        } else if (dayRelationScore < 0 && !isCompatible(name, userElement)) {
            score -= 3;
            reasons.push(`Ngày Khắc mệnh (${dayElement} khắc ${userElement})`);
        }



        if (dailyEnergy.actionReadiness > 70) {
            if (['Thân', 'Ngọ', 'Dần'].includes(name)) {
                score += 5;
                reasons.push("Năng lượng Hành động cao");
            }
        }

        if (dailyEnergy.focusLevel > 70) {
            if (['Tý', 'Dần', 'Mão'].includes(name)) {
                score += 5;
                reasons.push("Năng lượng Tập trung cao");
            }
        }

        if (dailyEnergy.emotionalBalance < 60) {
            if (['Tý', 'Hợi', 'Mùi'].includes(name)) {
                score += 5;
                reasons.push("Năng lượng Cần phục hồi");
            } else if (['Ngọ', 'Thân'].includes(name)) {
                score -= 5;
                reasons.push("Hạn chế vận động mạnh (cảm xúc thấp)");
            }
        }

        const startHour = (index * 2 + 23) % 24;
        const endHour = (index * 2 + 1) % 24;

        return {
            name,
            timeRange: `${startHour}h–${endHour}h`,
            startHour,
            endHour,
            score,
            isAuspicious: auspiciousIndices.includes(index),
            reasons: [...new Set(reasons)],
            action: getSuggestedAction(name, dailyEnergy)
        };
    });

    return scoredHours.sort((a, b) => b.score - a.score);
}

function getElementFromNumber(num) {
    const n = num % 10;
    if (n === 1 || n === 2) return 'Mộc';
    if (n === 3 || n === 4) return 'Hỏa';
    if (n === 5 || n === 6) return 'Thổ';
    if (n === 7 || n === 8) return 'Kim';
    return 'Thủy';
}

function getElementRelationScore(dayEl, userEl) {
    const sinh = { 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy' };
    const khac = { 'Thủy': 'Hỏa', 'Hỏa': 'Kim', 'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy' };

    if (sinh[dayEl] === userEl || dayEl === userEl) return 1;
    if (khac[dayEl] === userEl) return -1;
    return 0;
}

function isCompatible(hourName, userElement) {
    const priorities = {
        'Thủy': ['Tý', 'Thân'],
        'Mộc': ['Dần', 'Mão'],
        'Hỏa': ['Tỵ', 'Ngọ'],
        'Thổ': ['Thìn', 'Tuất', 'Sửu', 'Mùi'],
        'Kim': ['Thân', 'Dậu']
    };
    return priorities[userElement]?.includes(hourName);
}

function getSuggestedAction(hourName, energy) {
    if (energy.actionReadiness > 70) return "Hành động & quyết định quan trọng";
    if (energy.focusLevel > 70) return "Học tập & tập trung";
    if (energy.emotionalBalance < 60) return "Nghỉ ngơi & thiền định";
    return "Triển khai công việc";
}