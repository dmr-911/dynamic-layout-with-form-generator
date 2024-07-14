export const form = [
  {
    step: 1,
    label: "Introduction",
    form: {
      name: "Test",
      grid: 4,
      items: [
        {
          index: 1,
          widths: {
            default: "100%",
            greaterThan1440: "75%",
            between890And1440: "50%",
            between600And890: "67%",
          },
          name: "maritial_status",
          label: "Marital Status",
          required: true,
          tag: "select",
          options: ["married", "widowed"],
          placeholder: "Marital Status",
          validation: {
            type: "string",
            validations: [
              { type: "required", message: "Marital Status is required" },
            ],
          },
        },
        {
          index: 2,
          widths: {
            default: "100%",
            greaterThan1440: "25%",
            between890And1440: "33%",
            between600And890: "50%",
          },
          name: "spouse_name",
          label: "Spouse Name",
          depends: {
            name: "maritial_status",
            operator: "eq",
            value: "married",
          },
          tag: "input",
          type: "text",
          placeholder: "Enter spouse's name",
          validation: {
            type: "string",
            validations: [
              { type: "required", message: "Spouse name is required" },
            ],
          },
        },
        {
          index: 3,
          widths: {
            default: "100%",
            greaterThan1440: "100%",
            between890And1440: "100%",
            between600And890: "100%",
          },
          name: "address",
          label: "Address",
          required: false,
          tag: "textarea",
          placeholder: "Enter address",
        },
        {
          index: 4,
          widths: {
            default: "20%",
            greaterThan1440: "20%",
            between890And1440: "25%",
            between600And890: "33%",
          },
          name: "dob",
          label: "Date of Birth",
          required: false,
          tag: "input",
          type: "date",
          placeholder: "Enter date of birth",
        },
        {
          index: 5,
          widths: {
            default: "10%",
            greaterThan1440: "10%",
            between890And1440: "20%",
            between600And890: "25%",
          },
          name: "gender",
          label: "Gender",
          required: false,
          tag: "select",
          options: ["Male", "Female", "Other"],
          placeholder: "Select gender",
        },
        {
          index: 6,
          widths: {
            default: "100%",
            greaterThan1440: "100%",
            between890And1440: "100%",
            between600And890: "100%",
          },
          name: "email",
          label: "Email",
          required: true,
          tag: "input",
          type: "email",
          placeholder: "Enter email",
          depends: {
            name: "gender",
            operator: "eq",
            value: "Male",
          },
        },
        {
          index: 7,
          widths: {
            default: "100%",
            greaterThan1440: "100%",
            between890And1440: "100%",
            between600And890: "100%",
          },
          name: "friends",
          label: "Friends",
          required: true,
          tag: "repeater",
          form: {
            name: "Nested Test",
            grid: 4,
            items: [
              {
                index: 2,
                widths: {
                  default: "100%",
                  greaterThan1440: "25%",
                  between890And1440: "33%",
                  between600And890: "50%",
                },
                name: "spouse_name",
                label: "Spouse Name",
                tag: "input",
                type: "text",
                placeholder: "Enter spouse's name",
                required: true,
                validation: {
                  type: "string",
                  validations: {
                    minLength: {
                      value: 5,
                      message: "At least 4 letters characters required",
                    },
                  },
                },
              },
              {
                index: 4,
                widths: {
                  default: "20%",
                  greaterThan1440: "20%",
                  between890And1440: "25%",
                  between600And890: "33%",
                },
                name: "dob",
                label: "Date of Birth",
                required: false,
                tag: "input",
                type: "date",
                placeholder: "Enter date of birth",
              },
              {
                index: 5,
                widths: {
                  default: "10%",
                  greaterThan1440: "10%",
                  between890And1440: "20%",
                  between600And890: "25%",
                },
                name: "gender",
                label: "Gender",
                required: true,
                tag: "select",
                options: ["Male", "Female", "Other"],
                placeholder: "Select gender",
              },
            ],
          },
          validation: {
            type: "array",
            validations: {
              min: {
                value: 1,
                message: "At least one friend is required",
              },
            },
          },
        },
      ],
    },
    description: "This is the introduction step",
    content: `
          <div>
              <h1>Introduction</h1>
              <p>This is the introduction step</p>
          </div>
          `,
  },
  {
    step: 2,
    label: "Assets Type",
    form: {
      name: "Test",
      grid: 4,
      items: [
        {
          index: 1,
          widths: {
            default: "100%",
            greaterThan1440: "75%",
            between890And1440: "50%",
            between600And890: "67%",
          },
          name: "hello",
          label: "Marital Status",
          required: true,
          tag: "select",
          options: ["married", "widowed"],
          placeholder: "Marital Status",
          validation: {
            type: "string",
            validations: [
              { type: "required", message: "Marital Status is required" },
            ],
          },
        },
      ],
    },
    description: "This is the assets type step",
    content: `
              <div>
                  <h1>Assets Type</h1>
                  <p>This is the assets type step</p>
              </div>
              `,
  },
  {
    step: 3,
    label: "Asset Value",
    form: {
      name: "Test",
      grid: 4,
      items: [
        {
          index: 1,
          widths: {
            default: "100%",
            greaterThan1440: "75%",
            between890And1440: "50%",
            between600And890: "67%",
          },
          name: "hi",
          label: "Marital Status",
          required: true,
          tag: "select",
          options: ["married", "widowed"],
          placeholder: "Marital Status",
          validation: {
            type: "string",
            validations: [
              { type: "required", message: "Marital Status is required" },
            ],
          },
        },
      ],
    },
    description: "This is the asset value step",
    content: `
              <div class="bg-primary-400 rounded-md p-4">
                  <h1 class="text-2xl font-bold">Asset Value</h1>
                  <p>This is the asset value step. This is the asset value step. This is the asset value step. This is the asset value step</p>
              </div>
              `,
  },
];
