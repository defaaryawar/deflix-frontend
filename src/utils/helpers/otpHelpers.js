export const sendOtp = async (email) => {
    try {
        const response = await fetch("http://localhost:5000/api/otp/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log("OTP berhasil dikirim:", data);
        } else {
            throw new Error(data.message || "Gagal mengirim OTP");
        }
    } catch (error) {
        console.error("Error mengirim OTP:", error);
        throw new Error("Terjadi kesalahan saat mengirim OTP");
    }
};

export const verifyOtp = async (email, otp) => {
    try {
        const response = await fetch("http://localhost:5000/api/otp/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, otp }),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || "OTP tidak valid");
        }
    } catch (error) {
        console.error("Error memverifikasi OTP:", error);
        throw new Error("Terjadi kesalahan saat memverifikasi OTP");
    }
};
