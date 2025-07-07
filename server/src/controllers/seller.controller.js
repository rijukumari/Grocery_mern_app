import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 1000,
      });

      res.status(200).json({ message: "Login successful", success: true });
    }
  } catch (error) {
    console.log("Error in sellerLogin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// logout seller

export const logoutSeller = async(req,res) => {
     try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
    });
    res.json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// check auth

export const isAuthSeller = (req,res) => {
    try{
        res.status(200).json({success: true})

    } catch(error) {
        console.log("Error in isAuthSeller:", error)
        res.status(500).json({message: "Internal server error"});

    }
}