import jwt from 'jsonwebtoken';

const tokenGenerator = (data) => {

    const JWT_SECRET = process.env.JWT_SECRET;
    const TOKEN_EXPIRY_AT = process.env.TOKEN_EXPIRY_AT;

    jwt.sign(
        { data },
        JWT_SECRET,
        { TOKEN_EXPIRY_AT }
    );
}

export default tokenGenerator;