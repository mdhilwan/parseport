import { v4 } from "uuid";

const utils = {
    Rand4digit() {
        return v4().slice(0, 4)
    }
}

export default utils