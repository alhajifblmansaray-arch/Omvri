// How-to-measure slides for the Customize panel.
//
// Each slide is a single artwork with its own number, title, copy and tips
// baked in — so the carousel only frames the image, it adds no caption.
//
// Drop the files here (any that are missing degrade to a "coming soon" card):
//   public/images/measure/jacket/…
//   public/images/measure/pants/…
//
// `key` ties a slide to its field in JACKET_FIELDS / PANT_FIELDS.

export const jacketSlides = [
  { key: 'chest', label: 'Chest', src: '/images/measure/jacket/1-chest.jpg' },
  { key: 'shoulder', label: 'Shoulder Width', src: '/images/measure/jacket/2-shoulder-width.jpg' },
  { key: 'sleeve', label: 'Sleeve Length', src: '/images/measure/jacket/3-sleeve-length.jpg' },
  { key: 'backLength', label: 'Back Length', src: '/images/measure/jacket/4-back-length.jpg' },
  { key: 'stomach', label: 'Stomach', src: '/images/measure/jacket/5-stomach.jpg' },
  { key: 'bicep', label: 'Bicep', src: '/images/measure/jacket/6-bicep.jpg' },
  { key: 'neck', label: 'Neck', src: '/images/measure/jacket/7-neck.jpg' },
]

// Pant artwork is shot portrait, unlike the landscape jacket set.
export const pantSlides = [
  { key: 'hip', label: 'Hip', src: '/images/measure/pants/1-hip.jpg' },
  { key: 'pantWaist', label: 'Waist', src: '/images/measure/pants/2-waist.jpg' },
  { key: 'thigh', label: 'Thigh', src: '/images/measure/pants/3-thigh.jpg' },
  { key: 'outseam', label: 'Outseam', src: '/images/measure/pants/4-outseam.jpg' },
  { key: 'inseam', label: 'Inseam', src: '/images/measure/pants/5-inseam.jpg' },
]
