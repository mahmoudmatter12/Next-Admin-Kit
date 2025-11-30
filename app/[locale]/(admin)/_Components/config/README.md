# Admin Panel Configuration Guide

This directory contains all configuration files for customizing the admin panel. These files allow you to easily configure the dashboard, quick actions, stats, and more without modifying component code.

## 📁 Configuration Files

### 1. `admin-config.ts` - Main Admin Configuration

This is the primary configuration file where you can customize:

- **Branding**: Project name, welcome messages
- **Feature Flags**: Enable/disable dashboard features
- **Dashboard Layout**: Column counts, section visibility
- **Quick Actions**: Ordering, grouping, limits
- **Stats Cards**: Configure statistics/metrics to display
- **Welcome Message**: Customize the welcome section

**📝 See the file for detailed examples!** All examples are commented in the config file.

### 2. `dashboard-config.ts` - Dashboard Layout

Configure the dashboard sections and their order, spacing, and layout.

**📝 See the file for detailed examples!** Multiple layout examples are provided.

### 3. `navigation.ts` - Navigation Menu

Configure the sidebar navigation items. Items with `quickAccess: true` will appear in the Quick Actions section.

---

## 🚀 Quick Start Guide

### Step 1: Add Your First Stat Card

Open `admin-config.ts` and uncomment/modify an example:

```typescript
import { Users } from 'lucide-react';

stats: {
  enabled: true,
  cards: [
    {
      id: 'total-users',
      title: 'Total Users',
      value: 1234, // Or async function for dynamic data
      description: 'Active users in the system',
      icon: Users,
      href: '/admin/users',
      color: 'primary',
    },
  ],
},
```

### Step 2: Customize Quick Actions

```typescript
quickActions: {
  enabled: true,
  title: 'Quick Actions',
  maxItems: 6, // Limit to 6 items
  orderBy: 'alphabetical', // Sort alphabetically
  groupBy: 'none',
},
```

### Step 3: Reorder Dashboard Sections

Open `dashboard-config.ts` and change the `order` values:

```typescript
sections: [
  {
    id: 'stats',
    order: 1, // Show stats first
  },
  {
    id: 'welcome',
    order: 2, // Show welcome second
  },
  {
    id: 'quickActions',
    order: 3, // Show quick actions last
  },
],
```

---

## 📊 Common Use Cases

### Use Case 1: Add Stats from API

```typescript
{
  id: 'total-users',
  title: 'Total Users',
  value: async () => {
    const response = await fetch('/api/users/count');
    const data = await response.json();
    return data.count;
  },
  description: 'Active users',
  icon: Users,
  href: '/admin/users',
  color: 'primary',
}
```

### Use Case 2: Limit Quick Actions

```typescript
quickActions: {
  enabled: true,
  title: 'Most Used Actions',
  maxItems: 4, // Only show top 4
  orderBy: 'default',
}
```

### Use Case 3: Role-Based Stats

```typescript
{
  id: 'revenue',
  title: 'Total Revenue',
  value: '$45,230',
  icon: Database,
  color: 'success',
  roles: ['OWNER'], // Only owners see this
}
```

### Use Case 4: Custom Welcome Message

```typescript
welcome: {
  enabled: true,
  title: 'Welcome back!',
  description: 'Here\'s what\'s happening today.',
  showUserGreeting: true,
  customContent: (
    <div className="mt-4">
      <p>Custom content here</p>
    </div>
  ),
}
```

### Use Case 5: Hide Sections

```typescript
// In dashboard-config.ts
{
  id: 'welcome',
  enabled: false, // Hide welcome section
  order: 1,
  component: 'welcome',
}
```

---

## 🎨 Configuration Options

### Feature Flags

```typescript
features: {
  showQuickActions: true,    // Show quick actions
  showStatsCards: true,      // Show statistics
  showWelcomeMessage: true,  // Show welcome
  showRecentActivity: false, // Future feature
  showSystemInfo: false,     // Future feature
}
```

### Dashboard Layout

```typescript
dashboard: {
  showStatsRow: true,
  showQuickActionsSection: true,
  showWelcomeSection: true,
  statsColumns: 4,           // 2, 3, or 4 columns
  quickActionsColumns: 4,    // 2, 3, or 4 columns
}
```

### Quick Actions Options

```typescript
quickActions: {
  enabled: true,
  title: 'Quick Actions',
  maxItems: undefined,       // Limit items (undefined = no limit)
  orderBy: 'default',        // 'default' | 'alphabetical' | 'custom'
  customOrder: [],           // Array of hrefs for custom order
  groupBy: 'none',           // 'none' | 'section'
}
```

### Stats Card Colors

- `default` - Default gray theme
- `primary` - Blue theme
- `success` - Green theme
- `warning` - Yellow theme
- `danger` - Red theme

### Dashboard Spacing

- `compact` - Tighter spacing
- `normal` - Default spacing
- `spacious` - More space between sections

---

## 🔐 Role-Based Visibility

Most configuration options support role-based visibility:

```typescript
roles: ["OWNER", "SUPERADMIN", "ADMIN"]; // Only these roles see this
```

**If `roles` is not specified**, the item is visible to all authenticated users.

---

## 💡 Tips & Best Practices

1. **Start Simple**: Begin with static values, then add async functions
2. **Performance**: Async stats cards handle loading states automatically
3. **Ordering**: Use `orderBy: 'custom'` with `customOrder` for precise control
4. **Limits**: Set `maxItems` to keep dashboard clean
5. **Colors**: Use color coding (success=good, danger=alerts, warning=attention)
6. **Roles**: Always specify roles for sensitive information
7. **Testing**: Test with different user roles to verify visibility

---

## 📝 Examples in Files

Both `admin-config.ts` and `dashboard-config.ts` contain **comprehensive examples** with comments. Simply:

1. Open the config file
2. Find the example you want
3. Uncomment it
4. Modify to match your needs

All examples are clearly marked with `// EXAMPLE:` comments.

---

## 🆘 Troubleshooting

**Stats not showing?**

- Check `stats.enabled: true`
- Verify `features.showStatsCards: true`
- Ensure stat card has valid `id` and `icon`

**Quick actions not appearing?**

- Check `quickActions.enabled: true`
- Verify items in `navigation.ts` have `quickAccess: true`
- Check user role has permission

**Section not visible?**

- Check `enabled: true` in dashboard-config
- Verify user role is in `roles` array
- Check feature flags in admin-config

---

## 🔄 Next Steps

1. Review examples in config files
2. Uncomment and customize examples
3. Test with different user roles
4. Adjust layout and spacing as needed
5. Add your own stats cards and customizations
