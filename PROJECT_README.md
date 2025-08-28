# Porta Cabin CRM - Complete Business Management System

🚀 **A comprehensive CRM system designed specifically for porta cabin businesses, featuring Zoho Books-inspired design and complete business workflow management.**

## ✨ Key Features

- **Authentication & Security** - Role-based access control with secure JWT authentication
- **Dashboard & Analytics** - Real-time business metrics and interactive charts
- **Quotations Management** - Zoho Books-style quotation interface with tabular entry
- **Sales Orders** - PDF upload functionality with automatic project creation
- **Project Tracking** - Comprehensive project lifecycle management
- **Work Orders** - Task management with technical drawings support
- **Invoice Management** - Proforma and Tax invoices with ZED portal integration
- **Payroll & HR** - Employee management, attendance, and salary processing
- **Asset Management** - Asset tracking with barcode generation and depreciation

## 🎯 Demo Credentials

```
Email: admin@portacabin.com
Password: admin123
```

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 🛠️ Technology Stack

- **React 19.1.1** with TypeScript
- **Material-UI 7.3.1** for components
- **React Router** for navigation
- **React Hook Form** for form management
- **Date-fns** for date utilities

## 📱 Features Implemented

### ✅ Completed
- Authentication with role-based permissions
- Responsive sidebar navigation
- Dashboard with metrics and quick actions
- Quotations list with data grid
- Theme toggle (light/dark mode)
- Cloudflare deployment configuration

### 🚧 In Development
- Complete quotation form
- Sales orders module
- Projects management
- Work orders system
- Invoice management
- Payroll & HR module

## 🌐 Deployment

The application is configured for Cloudflare Pages deployment:

- Optimized build process (351KB gzipped)
- GitHub Actions CI/CD pipeline
- Environment variable management
- Security headers and redirects

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🎨 Design System

The UI follows Zoho Books design principles:

- **Primary Color**: #0066CC (Zoho Books Blue)
- **Typography**: Inter font family
- **Components**: Material Design 3 principles
- **Responsive**: Mobile-first approach

## 📝 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── common/         # Shared components
│   ├── layout/         # Layout components
│   └── modules/        # Feature modules
├── context/            # React Context providers
├── types/              # TypeScript definitions
├── utils/              # Utility functions
├── theme/              # Material-UI theme
└── constants/          # App constants
```

## 🤝 Contributing

1. Create a feature branch from `feature/mvp-development`
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📞 Support

- **Repository**: [GitHub](https://github.com/softwareOrbits/porta-cabin-crm)
- **Issues**: Report bugs and feature requests
- **Documentation**: See `/docs` folder for detailed guides

---

**Built with ❤️ for the porta cabin industry**