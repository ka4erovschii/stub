package md.org.home.stub.repositories;


import md.org.home.stub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
	//@Query("SELECT u FROM User u WHERE u.userName = :userName")
	//User findByUserName(@Param("userName") String userName);
	User findByUserNameAndPassword(String userName,String password);

    //@Query("SELECT u FROM User u WHERE  u.userName = :userName")
    User findByUserName(String userName);
}
