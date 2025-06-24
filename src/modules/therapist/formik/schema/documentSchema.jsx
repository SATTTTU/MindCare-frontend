export const documentSchema = z.object({
	passwordsizedphoto: z
		.any()
		.refine((val) => val !== null, {
			message: "Passport-sized photo is required",
		})
		.refine(
			(val) =>
				val === null || (val instanceof File && val.size <= 5 * 1024 * 1024),
			{ message: "File must be less than 5MB" }
		),
	citizenshipFront: z
		.any()
		.refine((val) => val !== null, {
			message: "Citizenship front image is required",
		})
		.refine(
			(val) =>
				val === null || (val instanceof File && val.size <= 5 * 1024 * 1024),
			{ message: "File must be less than 5MB" }
		),
	citizenshipBack: z
		.any()
		.refine((val) => val !== null, {
			message: "Citizenship back image is required",
		})
		.refine(
			(val) =>
				val === null || (val instanceof File && val.size <= 5 * 1024 * 1024),
			{ message: "File must be less than 5MB" }
		),
	certificates: z
		.array(z.any())
		.optional()
		.refine(
			(val) =>
				!val ||
				val.every(
					(file) => file instanceof File && file.size <= 5 * 1024 * 1024
				),
			{ message: "All certificate files must be less than 5MB" }
		),
	experienceLetters: z.string().optional(),
});