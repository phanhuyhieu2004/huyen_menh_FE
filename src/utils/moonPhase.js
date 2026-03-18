import { Moon } from 'lunarphase-js';

export const MOON_PHASES_DATA = {
    'New Moon': {
        name: "Trăng mới",
        emotion: "Khởi đầu mới, năng lượng tiềm ẩn",
        tip: "Đặt mục tiêu tuần mới, bắt đầu thói quen tốt",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430281/ChatGPT_Image_12_43_41_2_thg_3_2026_yxtvtj.png"
    },
    'Waxing Crescent': {
        name: "Trăng lưỡi liềm đầu",
        emotion: "Tăng trưởng, hy vọng",
        tip: "Hành động nhỏ, nuôi dưỡng ý tưởng",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430299/ChatGPT_Image_12_43_49_2_thg_3_2026_oy5ezr.png"
    },
    'First Quarter': {
        name: "Thượng huyền",
        emotion: "Quyết định, vượt thử thách",
        tip: "Tập trung hành động, vượt qua trở ngại",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430301/ChatGPT_Image_12_43_55_2_thg_3_2026_h1ch4h.png"
    },
    'Waxing Gibbous': {
        name: "Trăng khuyết lớn dần",
        emotion: "Hoàn thiện, tích lũy",
        tip: "Hoàn thành công việc, sáng tạo mạnh mẽ",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430303/ChatGPT_Image_12_43_58_2_thg_3_2026_oeskjt.png"
    },
    'Full Moon': {
        name: "Trăng tròn",
        emotion: "Đỉnh cảm xúc, sáng tạo",
        tip: "Chia sẻ cảm xúc, gặp gỡ, tránh tranh cãi",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430303/ChatGPT_Image_12_44_01_2_thg_3_2026_svjupm.png"
    },
    'Waning Gibbous': {
        name: "Trăng khuyết tàn dần",
        emotion: "Cảm ơn, chia sẻ",
        tip: "Ghi nhận thành quả, trò chuyện với người thân",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430302/ChatGPT_Image_12_44_06_2_thg_3_2026_nagchd.png"
    },
    'Last Quarter': {
        name: "Hạ huyền",
        emotion: "Buông bỏ, đánh giá lại",
        tip: "Loại bỏ thói quen xấu, nghỉ ngơi",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430303/ChatGPT_Image_12_44_09_2_thg_3_2026_chjb2k.png"
    },
    'Waning Crescent': {
        name: "Trăng lưỡi liềm cuối",
        emotion: "Nghỉ ngơi, thanh lọc",
        tip: "Thiền, ngủ sớm, dọn dẹp tâm hồn",
        image: "https://res.cloudinary.com/drac9ko3l/image/upload/v1772430303/ChatGPT_Image_12_44_15_2_thg_3_2026_qgy9ll.png"
    }
};

export function getMoonPhase(date = new Date()) {
    // Trả về age (0-29.53) chia cho chu kỳ để được tỷ lệ 0-1
    return Moon.lunarAge(date) / 29.530588853;
}

export function getMoonPhaseDetails(date = new Date()) {
    const phaseName = Moon.lunarPhase(date);
    const phasePercent = getMoonPhase(date);

    // Tìm key tương ứng hoặc mặc định là New Moon
    const data = MOON_PHASES_DATA[phaseName] || MOON_PHASES_DATA['New Moon'];

    return {
        ...data,
        progress: phasePercent,
        name: data.name,
        phaseName: phaseName
    };
}
