

export const MOON_PHASES_DATA = {
    newMoon: {
        name: "Trăng mới",
        emotion: "Khởi đầu mới, năng lượng tiềm ẩn",
        tip: "Đặt mục tiêu tuần mới, bắt đầu thói quen tốt",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430281/ChatGPT_Image_12_43_41_2_thg_3_2026_yxtvtj.png",
        range: [0, 0.125]
    },
    waxingCrescent: {
        name: "Trăng lưỡi liềm đầu",
        emotion: "Tăng trưởng, hy vọng",
        tip: "Hành động nhỏ, nuôi dưỡng ý tưởng",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430299/ChatGPT_Image_12_43_49_2_thg_3_2026_oy5ezr.png",
        range: [0.125, 0.25]
    },
    firstQuarter: {
        name: "Thượng huyền",
        emotion: "Quyết định, vượt thử thách",
        tip: "Tập trung hành động, vượt qua trở ngại",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430301/ChatGPT_Image_12_43_55_2_thg_3_2026_h1ch4h.png",
        range: [0.25, 0.375]
    },
    waxingGibbous: {
        name: "Trăng khuyết lớn dần",
        emotion: "Hoàn thiện, tích lũy",
        tip: "Hoàn thành công việc, sáng tạo mạnh mẽ",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430303/ChatGPT_Image_12_43_58_2_thg_3_2026_oeskjt.png",
        range: [0.375, 0.5]
    },
    fullMoon: {
        name: "Trăng tròn",
        emotion: "Đỉnh cảm xúc, sáng tạo",
        tip: "Chia sẻ cảm xúc, gặp gỡ, tránh tranh cãi",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430303/ChatGPT_Image_12_44_01_2_thg_3_2026_svjupm.png",
        range: [0.5, 0.625]
    },
    waningGibbous: {
        name: "Trăng khuyết tàn dần",
        emotion: "Cảm ơn, chia sẻ",
        tip: "Ghi nhận thành quả, trò chuyện với người thân",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430302/ChatGPT_Image_12_44_06_2_thg_3_2026_nagchd.png",
        range: [0.625, 0.75]
    },
    lastQuarter: {
        name: "Hạ huyền",
        emotion: "Buông bỏ, đánh giá lại",
        tip: "Loại bỏ thói quen xấu, nghỉ ngơi",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430303/ChatGPT_Image_12_44_09_2_thg_3_2026_chjb2k.png",
        range: [0.75, 0.875]
    },
    waningCrescent: {
        name: "Trăng lưỡi liềm cuối",
        emotion: "Nghỉ ngơi, thanh lọc",
        tip: "Thiền, ngủ sớm, dọn dẹp tâm hồn",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430303/ChatGPT_Image_12_44_15_2_thg_3_2026_qgy9ll.png",
        range: [0.875, 1]
    }
};


export function getMoonPhase(date = new Date()) {
    const LUNAR_MONTH = 29.530588853;

    const refNewMoon = new Date(Date.UTC(2024, 0, 11, 11, 57));

    const diff = (date.getTime() - refNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const phase = (diff % LUNAR_MONTH) / LUNAR_MONTH;

    return phase < 0 ? phase + 1 : phase;
}

export function getMoonPhaseDetails(date = new Date()) {
    const phase = getMoonPhase(date);
    let key = 'newMoon';

    for (const [pKey, data] of Object.entries(MOON_PHASES_DATA)) {
        if (phase >= data.range[0] && phase < data.range[1]) {
            key = pKey;
            break;
        }
    }

    return {
        ...MOON_PHASES_DATA[key],
        progress: phase,
        key
    };
}