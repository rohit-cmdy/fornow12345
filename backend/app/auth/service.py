from sqlalchemy.orm import Session

from app.auth.models import User
from app.auth.schemas import UserRegister
from app.core.security import get_password_hash, verify_password


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email.lower().strip()).first()


def create_user(db: Session, data: UserRegister) -> User:
    user = User(
        email=data.email.lower().strip(),
        password_hash=get_password_hash(data.password),
        full_name=data.full_name,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.password_hash):
        return None
    return user
