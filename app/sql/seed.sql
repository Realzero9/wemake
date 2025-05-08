-- Independent tables first
-- Categories
INSERT INTO categories (name, description, created_at, updated_at) VALUES
('SaaS', 'Software as a Service products', NOW(), NOW()),
('AI Tools', 'Artificial Intelligence and Machine Learning tools', NOW(), NOW()),
('Developer Tools', 'Tools for software developers', NOW(), NOW()),
('Design Tools', 'Tools for designers', NOW(), NOW()),
('Marketing Tools', 'Tools for marketers', NOW(), NOW());

-- Topics
INSERT INTO topics (name, slug, created_at) VALUES
('Development', 'development', NOW()),
('Design', 'design', NOW()),
('Marketing', 'marketing', NOW()),
('Startups', 'startups', NOW()),
('Product Management', 'product-management', NOW());

-- Message Rooms (independent)
INSERT INTO message_rooms (created_at) VALUES
(NOW());

-- Teams (with constraints)
INSERT INTO teams (product_name, team_size, equity_split, product_stage, roles, product_description, team_leader_id, created_at, updated_at) VALUES
('TechStart', 5, 20, 'idea', 'developer,designer', 'AI-powered development platform', '4faddc14-2809-407e-b1c0-f4e656b6d3a1', NOW(), NOW()),
('DesignFlow', 3, 33, 'prototype', 'designer,product-manager', 'Collaborative design tool', '4faddc14-2809-407e-b1c0-f4e656b6d3a1', NOW(), NOW()),
('MarketPro', 4, 25, 'mvp', 'marketer,developer', 'Marketing automation platform', '4faddc14-2809-407e-b1c0-f4e656b6d3a1', NOW(), NOW()),
('DevHub', 6, 15, 'growth', 'developer,marketer,designer', 'Developer collaboration platform', '4faddc14-2809-407e-b1c0-f4e656b6d3a1', NOW(), NOW()),
('SaaSMaster', 8, 12, 'mature', 'product-manager,developer,designer', 'Enterprise SaaS solution', '4faddc14-2809-407e-b1c0-f4e656b6d3a1', NOW(), NOW());

-- GPT Ideas
INSERT INTO gpt_ideas (idea, views, claimed_by, created_at) VALUES
('AI-powered personal fitness coach', 100, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', NOW()),
('Smart home energy optimization system', 75, NULL, NOW()),
('Automated content writing assistant', 150, NULL, NOW()),
('Virtual reality education platform', 200, NULL, NOW()),
('Blockchain-based voting system', 180, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', NOW());

-- Tables with foreign keys
-- Jobs (with correct ENUM values)
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, skills, company_name, company_logo, company_location, apply_url, job_type, location, salary_range, created_at, updated_at) VALUES
('Senior Frontend Developer', 'Lead our frontend development team', 'Lead development, mentor juniors', '5+ years React experience', 'Health insurance, 401k', 'React, TypeScript, Next.js', 'TechCorp', 'https://example.com/logo1.png', 'San Francisco', 'https://example.com/apply1', 'full-time', 'hybrid', '$120,000 - $150,000', NOW(), NOW()),
('UI/UX Designer', 'Design beautiful user interfaces', 'Create wireframes and prototypes', '3+ years design experience', 'Remote work, flexible hours', 'Figma, Adobe XD', 'DesignHub', 'https://example.com/logo2.png', 'New York', 'https://example.com/apply2', 'full-time', 'remote', '$70,000 - $100,000', NOW(), NOW()),
('Product Manager', 'Lead product development', 'Define product strategy', '4+ years PM experience', 'Stock options', 'Agile, Jira', 'ProductCo', 'https://example.com/logo3.png', 'Boston', 'https://example.com/apply3', 'full-time', 'in-person', '$100,000 - $120,000', NOW(), NOW()),
('Backend Developer', 'Build scalable backend systems', 'Design APIs and databases', '3+ years Node.js experience', 'Unlimited PTO', 'Node.js, PostgreSQL', 'ServerPro', 'https://example.com/logo4.png', 'Seattle', 'https://example.com/apply4', 'full-time', 'hybrid', '$100,000 - $120,000', NOW(), NOW()),
('Marketing Manager', 'Lead marketing initiatives', 'Create marketing strategies', '5+ years marketing experience', 'Health and dental', 'SEO, Analytics', 'MarketingPro', 'https://example.com/logo5.png', 'Chicago', 'https://example.com/apply5', 'full-time', 'in-person', '$70,000 - $100,000', NOW(), NOW());

-- Products (depends on categories)
INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at, updated_at) VALUES
('CodeBuddy', 'Your AI Programming Assistant', 'AI-powered code completion and review', 'Uses machine learning to analyze your code', 'https://example.com/icon1.png', 'https://codebuddy.com', '{"views": 1000, "reviews": 50}', '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 2, NOW(), NOW()),
('DesignMaster', 'Professional Design Tools', 'All-in-one design platform', 'Integrated design tools and assets', 'https://example.com/icon2.png', 'https://designmaster.com', '{"views": 800, "reviews": 30}', '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 4, NOW(), NOW()),
('MarketGenius', 'Smart Marketing Analytics', 'AI-powered marketing insights', 'Analyzes your marketing data', 'https://example.com/icon3.png', 'https://marketgenius.com', '{"views": 600, "reviews": 20}', '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 5, NOW(), NOW()),
('DevFlow', 'Streamline Your Development', 'Developer workflow automation', 'Automates common development tasks', 'https://example.com/icon4.png', 'https://devflow.com', '{"views": 750, "reviews": 40}', '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 3, NOW(), NOW()),
('CloudSaaS', 'Enterprise Cloud Solution', 'Scalable cloud infrastructure', 'Cloud-based business solutions', 'https://example.com/icon5.png', 'https://cloudsaas.com', '{"views": 900, "reviews": 45}', '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 1, NOW(), NOW());

-- Posts (depends on topics)
INSERT INTO posts (title, content, topic_id, profile_id, created_at, updated_at) VALUES
('Getting Started with React', 'A comprehensive guide to React development...', 1, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', NOW(), NOW()),
('UI Design Principles', 'Essential principles for modern UI design...', 2, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', NOW(), NOW()),
('Marketing Strategies 2024', 'Effective marketing strategies for the new year...', 3, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', NOW(), NOW()),
('Startup Funding Guide', 'How to secure funding for your startup...', 4, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', NOW(), NOW()),
('Product Roadmap Tips', 'Creating effective product roadmaps...', 5, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', NOW(), NOW());

-- Post Replies (depends on posts)
INSERT INTO post_replies (post_id, parent_id, profile_id, reply, created_at, updated_at) VALUES
(1, NULL, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'Great guide! Very helpful for beginners.', NOW(), NOW()),
(2, NULL, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'These principles are essential for modern design.', NOW(), NOW()),
(3, NULL, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'Excellent marketing insights!', NOW(), NOW()),
(4, NULL, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'This helped me secure my seed round.', NOW(), NOW()),
(5, NULL, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'Very practical roadmap advice.', NOW(), NOW());

-- Messages (depends on message_rooms)
INSERT INTO messages (message_room_id, sender_id, content, seen, created_at) VALUES
(1, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'Hello! Interested in collaboration?', true, NOW()),
(1, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'I have some ideas to discuss', true, NOW()),
(1, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'Let me know when you are free', false, NOW()),
(1, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'I will prepare a proposal', false, NOW()),
(1, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'Looking forward to our discussion', false, NOW());

-- Bridge tables (with composite primary keys)
INSERT INTO follows (follower_id, following_id, created_at) VALUES
('4faddc14-2809-407e-b1c0-f4e656b6d3a1', '4faddc14-2809-407e-b1c0-f4e656b6d3a1', NOW());

INSERT INTO product_upvotes (product_id, profile_id) VALUES
(1, '4faddc14-2809-407e-b1c0-f4e656b6d3a1');

INSERT INTO post_upvotes (post_id, profile_id) VALUES
(1, '4faddc14-2809-407e-b1c0-f4e656b6d3a1');

INSERT INTO gpt_idea_likes (gpt_idea_id, profile_id) VALUES
(1, '4faddc14-2809-407e-b1c0-f4e656b6d3a1');

INSERT INTO message_room_members (message_room_id, profile_id, created_at) VALUES
(1, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', NOW());

-- Notifications (depends on multiple tables)
INSERT INTO notifications (source_id, product_id, post_id, target_id, type, created_at) VALUES
(NULL, 1, NULL, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'review', NOW()),
(NULL, NULL, 1, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'reply', NOW()),
(NULL, NULL, NULL, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'follow', NOW()),
(NULL, 2, NULL, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'mention', NOW()),
(NULL, NULL, 2, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 'reply', NOW()); 

INSERT INTO reviews (product_id, profile_id, rating, review, created_at, updated_at) VALUES
(31, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 5, '정말 유용한 AI 프로그래밍 도우미입니다.', NOW(), NOW()),
(34, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 4, '디자인 툴이 직관적이고 사용하기 편해요.', NOW(), NOW()),
(31, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 5, '마케팅 인사이트가 뛰어납니다.', NOW(), NOW()),
(33, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 3, '개발 자동화 기능이 조금 더 다양했으면 좋겠어요.', NOW(), NOW()),
(33, '4faddc14-2809-407e-b1c0-f4e656b6d3a1', 4, '클라우드 SaaS 솔루션이 안정적입니다.', NOW(), NOW());