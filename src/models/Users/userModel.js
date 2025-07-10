import mongoose from "mongoose"


const coordinateSchema = new mongoose.Schema(
    {
        lat: { type: Number, require: true },
        lng: { type: Number, require: true }
    }
)

const addressSchema = new mongoose.Schema(
    {
        address: { type: String, require: true },
        city: { type: String, require: true },
        state: { type: String, require: true },
        stateCode: { type: String, require: true },
        postalCode: { type: Number, require: true },
        coordinates: coordinateSchema,
        country: { type: Number, require: true }
    }
)


const bankSchema = new mongoose.Schema(
    {
        cardExpire: { type: String, require: true },
        cardNumber: { type: String, require: true },
        cardType: { type: String, require: true },
        currency: { type: String, require: true },
        iban: { type: String, require: true },
    }
)

const companySchema = new mongoose.Schema(
    {
        department: { type: String, require: true },
        name: { type: String, require: true },
        title: { type: String, require: true },
        address: addressSchema
    }
)

const userSchema = new mongoose.Schema(
    {
        id: { type: String, requie: true },
        firstName: { type: String, requie: true },
        lastName: { type: String, requie: true },
        maidenName: String,
        age: { type: Number, requie: true },
        gender: { type: String, requie: true },
        email: { type: String, requie: true },
        phone: { type: String, requie: true },
        username: { type: String, requie: true },
        password: { type: String, requie: true },
        birthDate: { type: String, requie: true },
        image: String,
        bloodGroup: String,
        height: Number,
        weight: Number,
        eyeColor: String,
        ip: String,
        address: addressSchema,
        macAddress: String,
        university: String,
        bank: bankSchema,
        company: companySchema,
        ein: { type: String, require: true },
        ssn: { type: String, require: true },
        userAgent: { type: String, require: true },
        role: { type: String, require: true },

    },
    {
        collection: 'Users',
        timestamps: true
    }
)

const userModel = mongoose.model("Users", userSchema)

export default userModel