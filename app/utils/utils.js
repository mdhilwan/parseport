import { v4 } from "uuid";

const utils = {
    Rand8digit() {
        return v4().slice(0, 8)
    }
}

export default utils