import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name as keyof Errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors: Errors = {};

    if (!formData.username.trim()) {
      newErrors.username = '用户名不能为空';
    }

    if (!isLogin && !formData.email) {
      newErrors.email = '邮箱不能为空';
    } else if (!isLogin && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确';
    }

    if (!formData.password) {
      newErrors.password = '密码不能为空';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少需要6位';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }

    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 实际应用中这里会调用API
    console.log(isLogin ? '登录数据:' : '注册数据:', formData);

    // 成功后的操作
    alert(isLogin ? '登录成功！' : '注册成功！');
    navigate('/dashbord');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-tab-container">
          <button
            className={`auth-tab-button${isLogin ? ' active' : ''}`}
            onClick={() => setIsLogin(true)}
            type="button"
          >
            登录
          </button>
          <button
            className={`auth-tab-button${!isLogin ? ' active' : ''}`}
            onClick={() => setIsLogin(false)}
            type="button"
          >
            注册
          </button>
        </div>

        <h2 className="auth-title">{isLogin ? '用户登录' : '新用户注册'}</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="username" className="auth-label">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="auth-input"
              placeholder="请输入用户名"
            />
            {errors.username && <span className="auth-error">{errors.username}</span>}
          </div>

          {!isLogin && (
            <div className="auth-form-group">
              <label htmlFor="email" className="auth-label">电子邮箱</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
                placeholder="请输入邮箱"
              />
              {errors.email && <span className="auth-error">{errors.email}</span>}
            </div>
          )}

          <div className="auth-form-group">
            <label htmlFor="password" className="auth-label">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
              placeholder="请输入密码"
            />
            {errors.password && <span className="auth-error">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="auth-form-group">
              <label htmlFor="confirmPassword" className="auth-label">确认密码</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="auth-input"
                placeholder="请再次输入密码"
              />
              {errors.confirmPassword && (
                <span className="auth-error">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          <button type="submit" className="auth-submit-button">
            {isLogin ? '登 录' : '注 册'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;