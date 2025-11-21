package com.teten.kivabi.service.security.service;

import com.teten.kivabi.service.model.User;
import com.teten.kivabi.service.security.dto.AuthenticatedUserDto;
import com.teten.kivabi.service.security.dto.RegistrationRequest;
import com.teten.kivabi.service.security.dto.RegistrationResponse;

public interface UserService {

  User findByUsername(String username);

  RegistrationResponse registration(RegistrationRequest registrationRequest);

  AuthenticatedUserDto findAuthenticatedUserByUsername(String username);
}
