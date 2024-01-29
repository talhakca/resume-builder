import { HeadingType } from 'projects/component-library/src/lib/shared/enums/heading-type.enum';
import { ContentTreeItemType } from './content-tree-item-type.enum';
import { DividerOrientation } from 'projects/component-library/src/lib/shared/enums/divider-orientation.enum';
import { IconTheme } from 'projects/component-library/src/lib/shared/enums/icon-theme.enum';
import { HeaderType } from 'projects/component-library/src/lib/shared/enums/header-type.enum';

export const inputDefinitions = [
  {
    component: ContentTreeItemType.Heading,
    inputs: [
      {
        type: 'string',
        fieldName: 'content',
        default: 'Your Title Here'
      },
      {
        type: 'enum',
        fieldName: 'type',
        enum: HeadingType,
        default: HeadingType.H1
      }
    ]
  },
  {
    component: ContentTreeItemType.Divider,
    inputs: [
      {
        type: 'enum',
        fieldName: 'orientation',
        enum: DividerOrientation,
        default: DividerOrientation.Center
      },
      {
        type: 'string',
        fieldName: 'text',
        default: ''
      }
    ]
  },
  {
    component: ContentTreeItemType.Text,
    inputs: [
      {
        type: 'string',
        fieldName: 'text',
        default: 'Enter your text here'
      }
    ]
  },
  {
    component: ContentTreeItemType.Icon,
    inputs: [
      {
        type: 'string',
        fieldName: 'name',
        default: 'phone'
      },
      {
        type: 'enum',
        enum: IconTheme,
        fieldName: 'theme',
        default: IconTheme.Outlined
      }
    ]
  },
  {
    component: ContentTreeItemType.Summary,
    inputs: [
      {
        type: 'string',
        fieldName: 'description',
        default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt eget justo tempus efficitur. Vestibulum et vestibulum lorem. Nullam suscipit quis tellus nec auctor. Donec vitae ligula nunc. Sed porttitor nisi vel lacus tempor facilisis. Pellentesque iaculis dictum varius. Morbi dapibus justo tincidunt risus rutrum mollis. Nulla facilisi. Donec odio urna, malesuada at eleifend auctor, vulputate ut odio. Donec fermentum vestibulum turpis nec blandit. In felis est, tempus vitae arcu nec, rhoncus porta elit.'
      }
    ]
  },
  {
    component: ContentTreeItemType.Header,
    inputs: [
      {
        type: 'enum',
        fieldName: 'type',
        enum: HeaderType,
        default: HeaderType.HeaderWithBacgkroundImage,
        allowHTMLEdit: false
      },
      {
        type: 'string',
        fieldName: 'firstName',
        default: 'Talha',
        allowHTMLEdit: false
      },
      {
        type: 'string',
        fieldName: 'lastName',
        default: 'Akca',
        allowHTMLEdit: false
      },
      {
        type: 'string',
        fieldName: 'title',
        default: 'Sr. Software Engineer',
        allowHTMLEdit: false
      },
      {
        type: 'string',
        fieldName: 'backgroundImageUrl',
        default: 'https://images.unsplash.com/photo-1706449511874-6a0ca25fa750?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        allowHTMLEdit: false
      }
    ]
  },
  {
    component: ContentTreeItemType.Experiences,
    inputs: [
      {
        type: 'experiences-input',
        allowHTMLEdit: false,
        fieldName: 'experiences',
        default: [
          {
            title: 'Senior Angular Developer',
            company: 'XYZ Solutions',
            location: 'Chang Mai, Thailand',
            description: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt eget justo tempus efficitur.
            <ul>
              <li>Developed and maintained scalable and responsive web applications using Angular framework.</li>
              <li>Collaborated with cross-functional teams to design and implement new features.</li>
              <li>Optimized application performance through code reviews and performance profiling.</li>
              <li>Integrated RESTful APIs and third-party libraries to enhance application functionality.</li>
              <li>Provided mentorship and technical guidance to junior developers.</li>
            </ul>`,
            startDate: new Date('29 May 2023'),
            endDate: new Date('29 January 2024'),
          },
          {
            title: 'Junior Angular Developer',
            company: 'ABC Tech LLC',
            location: 'Izmir, Turkey',
            description: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt eget justo tempus efficitur.
            <ul>
      <li>Worked on the development of a customer portal, implementing dynamic user interfaces with Angular.</li>
      <li>Collaborated with UX/UI designers to ensure a seamless and visually appealing user experience.</li>
      <li>Utilized Angular services and dependency injection for modular and maintainable code.</li>
      <li>Participated in sprint planning, daily stand-ups, and retrospective meetings to improve team efficiency.</li>
    </ul>`,
            startDate: new Date('29 May 2023'),
            endDate: new Date('29 January 2024'),
          }
        ],
      }
    ]
  }
];