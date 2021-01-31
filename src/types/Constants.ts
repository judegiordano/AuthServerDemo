/* eslint-disable no-unused-vars */
export const enum Environment {
	dev = "development",
	stg = "staging",
	prod = "production"
}

export const enum RateLimit {
	generic = "Too Many Requests. Please Try Again later.",
	oneDay = "Too Many Requests. Please Try Again Tomorrow."
}

export const enum UserErrors {
	wrongPassword = "incorrect password",
	credsTaken = "email / username taken",
	wrongUsername = "username not found"
}